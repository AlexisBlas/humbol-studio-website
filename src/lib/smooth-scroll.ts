const HEADER_OFFSET = 64;
const HERO_PIN_ID = "hero-pin";

/** Move curve — smooth deceleration without a slow start. */
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

let rafId = 0;

/** Force instant jumps so CSS `scroll-behavior: smooth` cannot fight the rAF ease. */
function scrollInstant(top: number) {
  window.scrollTo({ top, left: 0, behavior: "instant" });
}

function cancelScroll() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }
}

function animateScrollTo(targetY: number) {
  cancelScroll();

  let from = window.scrollY;

  // Hash nav should not crawl through the hero pin scrub — that reads as a delay.
  // Snap to the end of the pin track first, then ease the short remaining distance.
  const heroPin = document.getElementById(HERO_PIN_ID);
  if (heroPin && !prefersReducedMotion()) {
    const heroEnd = heroPin.offsetTop + heroPin.offsetHeight;
    const pastHero = Math.max(0, heroEnd - window.innerHeight);
    if (from < pastHero - 8 && targetY > pastHero) {
      scrollInstant(pastHero);
      from = pastHero;
    }
  }

  const diff = targetY - from;

  if (Math.abs(diff) < 1) {
    scrollInstant(targetY);
    return;
  }

  if (prefersReducedMotion()) {
    scrollInstant(targetY);
    return;
  }

  // Snappy settle after any hero snap — keep under ~500ms.
  const duration = Math.min(500, Math.max(280, Math.abs(diff) * 0.35));
  const start = performance.now();

  const frame = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    scrollInstant(from + diff * easeOutCubic(t));
    if (t < 1) {
      rafId = requestAnimationFrame(frame);
    } else {
      rafId = 0;
    }
  };

  rafId = requestAnimationFrame(frame);
}

function targetYForElement(el: HTMLElement) {
  const top = el.getBoundingClientRect().top + window.scrollY;
  return Math.max(0, top - HEADER_OFFSET);
}

type ScrollHistoryState = {
  scrollY: number;
};

function isScrollHistoryState(state: unknown): state is ScrollHistoryState {
  return (
    !!state &&
    typeof state === "object" &&
    "scrollY" in state &&
    typeof (state as ScrollHistoryState).scrollY === "number"
  );
}

function currentUrl() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

/**
 * Push a new history entry only when the URL changes.
 * Stores scrollY on the entry we're leaving and the one we're entering
 * so Back/Forward can restore position instead of forcing the top.
 */
function setHistoryUrl(url: string, nextScrollY: number) {
  const current = currentUrl();
  if (current === url) {
    history.replaceState({ scrollY: nextScrollY } satisfies ScrollHistoryState, "", url);
    return;
  }
  history.replaceState(
    { scrollY: window.scrollY } satisfies ScrollHistoryState,
    "",
    current,
  );
  history.pushState({ scrollY: nextScrollY } satisfies ScrollHistoryState, "", url);
}

/** Smoothly scroll to an element by id (without the #). */
export function smoothScrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const y = targetYForElement(el);
  animateScrollTo(y);
  setHistoryUrl(`#${id}`, y);
  return true;
}

/** Smoothly scroll to the top of the page. */
export function smoothScrollToTop() {
  animateScrollTo(0);
  setHistoryUrl(`${window.location.pathname}${window.location.search}`, 0);
}

/**
 * Handle same-page hash / home links with eased scrolling.
 * Returns true when the click was handled.
 */
export function handleSmoothNavClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Element)) return false;

  const anchor = target.closest("a[href]");
  if (!(anchor instanceof HTMLAnchorElement)) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return false;
  }

  const href = anchor.getAttribute("href");
  if (!href) return false;

  // Home logo → top of page when already on the homepage
  if (href === "/" && window.location.pathname === "/") {
    event.preventDefault();
    smoothScrollToTop();
    return true;
  }

  if (!href.startsWith("#") || href === "#") return false;

  const id = decodeURIComponent(href.slice(1));
  if (!id || !document.getElementById(id)) return false;

  event.preventDefault();
  // Start immediately — don't wait for mobile menu exit animation.
  smoothScrollToId(id);
  return true;
}

/** Keep scroll position in sync when the user uses back/forward. */
export function bindSmoothScrollHistory() {
  const previousRestoration = history.scrollRestoration;
  history.scrollRestoration = "manual";

  const onPopState = (event: PopStateEvent) => {
    if (isScrollHistoryState(event.state)) {
      animateScrollTo(event.state.scrollY);
      return;
    }

    const hash = window.location.hash;
    if (hash.length > 1) {
      const id = decodeURIComponent(hash.slice(1));
      const el = document.getElementById(id);
      if (el) {
        animateScrollTo(targetYForElement(el));
        return;
      }
    }

    // No saved scroll and no hash — leave the browser alone.
  };

  window.addEventListener("popstate", onPopState);
  return () => {
    history.scrollRestoration = previousRestoration;
    window.removeEventListener("popstate", onPopState);
  };
}

export function bindSmoothScrollInterrupt() {
  const stop = () => cancelScroll();
  const onKeyDown = (e: KeyboardEvent) => {
    if (
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "PageUp" ||
      e.key === "PageDown" ||
      e.key === "Home" ||
      e.key === "End" ||
      e.key === " "
    ) {
      stop();
    }
  };

  window.addEventListener("wheel", stop, { passive: true });
  window.addEventListener("touchstart", stop, { passive: true });
  window.addEventListener("keydown", onKeyDown);

  return () => {
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
    window.removeEventListener("keydown", onKeyDown);
  };
}
