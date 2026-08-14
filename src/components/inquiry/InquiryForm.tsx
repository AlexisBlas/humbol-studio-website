"use client";

import { FormEvent, useId, useRef, useState } from "react";
import { CheckMark, FieldError } from "@/components/inquiry/FieldError";
import {
  budgetOptions,
  FORMSPREE_ENDPOINT,
  projectTypes,
  timelineOptions,
} from "@/data/inquiry";
import { cn } from "@/lib/utils";

type FieldKey = "name" | "email" | "project" | "budget" | "message";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: HTMLFormElement): Partial<Record<FieldKey, string>> {
  const data = new FormData(form);
  const errors: Partial<Record<FieldKey, string>> = {};

  if (!String(data.get("name") ?? "").trim()) {
    errors.name = "We'd love to know what to call you.";
  }

  const email = String(data.get("email") ?? "").trim();
  if (!email) errors.email = "We need an email to reply to.";
  else if (!EMAIL_RE.test(email)) {
    errors.email = "That email doesn't look complete — mind checking it?";
  }

  if (!data.getAll("project_type").length) {
    errors.project = 'Pick at least one — "Something else" works too.';
  }

  if (!data.get("budget")) {
    errors.budget = 'Choose a range, or "I\'m not sure yet."';
  }

  if (String(data.get("message") ?? "").trim().length < 20) {
    errors.message = "A sentence or two is all we need to get started.";
  }

  return errors;
}

export function InquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);
  const ids = useId();

  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showSending, setShowSending] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const setLive = (text: string) => {
    if (liveRef.current) liveRef.current.textContent = text;
  };

  const runField = (key: FieldKey) => {
    const form = formRef.current;
    if (!form) return;
    const next = validate(form);
    setErrors((prev) => {
      const copy = { ...prev };
      if (next[key]) copy[key] = next[key];
      else delete copy[key];
      return copy;
    });
  };

  const focusFirstError = (next: Partial<Record<FieldKey, string>>) => {
    const order: FieldKey[] = ["name", "email", "project", "budget", "message"];
    const first = order.find((key) => next[key]);
    if (!first || !formRef.current) return;
    const map: Record<FieldKey, string> = {
      name: "name",
      email: "email",
      project: "project_type",
      budget: "budget",
      message: "message",
    };
    const el = formRef.current.querySelector<HTMLElement>(`[name="${map[first]}"]`);
    el?.focus();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitFailed(false);

    const form = event.currentTarget;
    const next = validate(form);
    setErrors(next);

    if (Object.keys(next).length) {
      focusFirstError(next);
      setLive("Please check the highlighted fields.");
      return;
    }

    const honeypot = String(new FormData(form).get("_gotcha") ?? "");
    if (honeypot) return;

    setSubmitting(true);
    const sendingTimer = window.setTimeout(() => setShowSending(true), 100);

    const payload = new FormData(form);
    payload.delete("_gotcha");
    payload.set("_subject", "New project inquiry — humbol.studio");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("submit failed");

      window.clearTimeout(sendingTimer);
      setSucceeded(true);
      setLive("Thank you — it's on its way.");
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      window.clearTimeout(sendingTimer);
      setShowSending(false);
      setSubmitFailed(true);
      setSubmitting(false);
      setLive("Something went wrong. Try sending again.");
    }
  };

  if (succeeded) {
    return (
      <div className="rounded-3xl border border-stone bg-surface px-6 py-10 md:px-10 md:py-12">
        <h2
          ref={successRef}
          tabIndex={-1}
          className="text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-graphite outline-none md:text-[33px]"
        >
          Thank you — it&apos;s on its way.
        </h2>
        <p className="mt-4 max-w-[36ch] text-body-md leading-6 text-slate">
          We&apos;ll reply from hello@humbol.studio within two business days.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className="relative flex flex-col gap-8 rounded-3xl border border-stone bg-surface px-5 py-8 shadow-[0px_1px_3px_rgba(28,25,23,0.06),0px_1px_2px_rgba(28,25,23,0.04)] md:px-10 md:py-10"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor={`${ids}-name`} className="text-label-caps font-bold uppercase tracking-[0.08em] text-slate">
          Your name
        </label>
        <input
          id={`${ids}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? `${ids}-name-err` : undefined}
          onBlur={() => runField("name")}
          className={cn(
            "h-12 rounded-2xl border bg-bg-primary px-4 text-base text-graphite outline-none transition-[border-color,background-color] duration-150 ease-out placeholder:text-steel",
            errors.name
              ? "border-[#8B3A2A]"
              : "border-stone hover:border-pebble focus-visible:border-interactive",
          )}
        />
        {errors.name ? <FieldError id={`${ids}-name-err`}>{errors.name}</FieldError> : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${ids}-email`} className="text-label-caps font-bold uppercase tracking-[0.08em] text-slate">
          Email
        </label>
        <input
          id={`${ids}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${ids}-email-err` : undefined}
          onBlur={() => runField("email")}
          className={cn(
            "h-12 rounded-2xl border bg-bg-primary px-4 text-base text-graphite outline-none transition-[border-color,background-color] duration-150 ease-out placeholder:text-steel",
            errors.email
              ? "border-[#8B3A2A]"
              : "border-stone hover:border-pebble focus-visible:border-interactive",
          )}
        />
        {errors.email ? <FieldError id={`${ids}-email-err`}>{errors.email}</FieldError> : null}
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="text-label-caps font-bold uppercase tracking-[0.08em] text-slate">
          What kind of project is this?
        </legend>
        <p id={`${ids}-project-help`} className="text-sm leading-5 text-slate">
          Choose all that apply. Not sure is a fine answer.
        </p>
        <div className="grid grid-cols-1 gap-2">
          {projectTypes.map((type) => (
            <label
              key={type.value}
              className="group relative flex min-h-11 cursor-pointer items-start gap-3 rounded-2xl border border-stone bg-bg-primary px-4 py-3.5 transition-[border-color,background-color] duration-150 ease-out hover:border-pebble has-[:checked]:border-interactive has-[:checked]:bg-interactive-tint/40 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-interactive"
            >
              <input
                type="checkbox"
                name="project_type"
                value={type.value}
                onBlur={() => runField("project")}
                aria-invalid={errors.project ? true : undefined}
                aria-describedby={
                  errors.project
                    ? `${ids}-project-help ${ids}-project-err`
                    : `${ids}-project-help`
                }
                className="peer sr-only"
              />
              <span className="mt-0.5 grid size-[22px] shrink-0 place-items-center rounded-full border-[1.5px] border-stone bg-surface text-transparent transition-colors duration-150 ease-out peer-checked:border-interactive peer-checked:bg-interactive peer-checked:text-accent">
                <CheckMark />
              </span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-base font-bold text-graphite">{type.title}</span>
                {"description" in type && type.description ? (
                  <span className="text-sm leading-5 text-slate">{type.description}</span>
                ) : null}
              </span>
            </label>
          ))}
        </div>
        {errors.project ? (
          <FieldError id={`${ids}-project-err`}>{errors.project}</FieldError>
        ) : null}
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="text-label-caps font-bold uppercase tracking-[0.08em] text-slate">
          What&apos;s your budget?
        </legend>
        <p id={`${ids}-budget-help`} className="text-sm leading-5 text-slate">
          A range is enough — it helps us shape the right approach.
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {budgetOptions.map((option) => (
            <label
              key={option}
              className={cn(
                "relative flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-stone bg-bg-primary px-4 text-sm font-bold text-graphite transition-[border-color,background-color] duration-150 ease-out hover:border-pebble has-[:checked]:border-interactive has-[:checked]:bg-interactive-tint/50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-interactive",
                option === "I'm not sure yet" && "sm:col-span-2",
              )}
            >
              <input
                type="radio"
                name="budget"
                value={option}
                onBlur={() => runField("budget")}
                aria-invalid={errors.budget ? true : undefined}
                aria-describedby={
                  errors.budget
                    ? `${ids}-budget-help ${ids}-budget-err`
                    : `${ids}-budget-help`
                }
                className="peer sr-only"
              />
              <span className="grid size-4 shrink-0 place-items-center rounded-full border-[1.5px] border-stone transition-colors duration-150 ease-out peer-checked:border-interactive peer-checked:bg-interactive after:size-1.5 after:rounded-full after:bg-bg-primary after:opacity-0 after:content-[''] peer-checked:after:opacity-100" />
              {option}
            </label>
          ))}
        </div>
        {errors.budget ? (
          <FieldError id={`${ids}-budget-err`}>{errors.budget}</FieldError>
        ) : null}
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="text-label-caps font-bold uppercase tracking-[0.08em] text-slate">
          When would you like to start?{" "}
          <span className="font-bold normal-case tracking-normal text-steel">
            Optional
          </span>
        </legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {timelineOptions.map((option) => (
            <label
              key={option}
              className={cn(
                "relative flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-stone bg-bg-primary px-4 text-center text-sm font-bold text-graphite transition-[border-color,background-color] duration-150 ease-out hover:border-pebble has-[:checked]:border-interactive has-[:checked]:bg-interactive-tint/50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-interactive",
                option === "Just exploring" && "sm:col-span-2",
              )}
            >
              <input type="radio" name="timeline" value={option} className="peer sr-only" />
              <span className="grid size-4 shrink-0 place-items-center rounded-full border-[1.5px] border-stone transition-colors duration-150 ease-out peer-checked:border-interactive peer-checked:bg-interactive after:size-1.5 after:rounded-full after:bg-bg-primary after:opacity-0 after:content-[''] peer-checked:after:opacity-100" />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${ids}-message`} className="text-label-caps font-bold uppercase tracking-[0.08em] text-slate">
          Tell us about it
        </label>
        <textarea
          id={`${ids}-message`}
          name="message"
          required
          minLength={20}
          placeholder="What are you making? Who is it for? What does success look like?"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${ids}-message-err` : undefined}
          onBlur={() => runField("message")}
          className={cn(
            "min-h-36 resize-y rounded-2xl border bg-bg-primary px-4 py-3 text-base leading-6 text-graphite outline-none transition-[border-color] duration-150 ease-out placeholder:text-steel",
            errors.message
              ? "border-[#8B3A2A]"
              : "border-stone hover:border-pebble focus-visible:border-interactive",
          )}
        />
        {errors.message ? (
          <FieldError id={`${ids}-message-err`}>{errors.message}</FieldError>
        ) : null}
      </div>

      <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${ids}-hp`}>Website</label>
        <input
          id={`${ids}-hp`}
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {submitFailed ? (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-2xl border border-[#8B3A2A]/25 bg-[#8B3A2A]/5 px-4 py-3 text-sm leading-5 text-[#8B3A2A]"
        >
          <AlertIcon />
          <span>
            Something went wrong on our end — your message wasn&apos;t lost. Try
            sending again, or email us directly at{" "}
            <a className="font-bold underline underline-offset-2" href="mailto:hello@humbol.studio">
              hello@humbol.studio
            </a>
            .
          </span>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-12 items-center justify-center rounded-full bg-interactive px-6 text-base font-bold text-bg-primary transition-colors duration-150 ease-out hover:bg-interactive-hover active:bg-interactive-pressed disabled:cursor-wait disabled:opacity-70"
      >
        {showSending ? "Sending…" : "Send inquiry"}
      </button>

      <p ref={liveRef} className="sr-only" aria-live="polite" />
    </form>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="mt-0.5 size-4 shrink-0" aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 4.8v4.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="11.1" r="0.7" fill="currentColor" />
    </svg>
  );
}
