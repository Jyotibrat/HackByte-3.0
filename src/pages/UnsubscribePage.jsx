import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  MESSAGES,
  maskEmail,
  submitUnsubscribe,
  validateUnsubscribeParams,
} from "../services/unsubscribeService";
import "./UnsubscribePage.scss";

/**
 * Newsletter Unsubscribe Page
 *
 * Direct landing route for email unsubscribe links:
 *   /unsubscribe?email=<email>&token=<64 hex chars>
 *
 * Security & Anti-Scanner Guarantees:
 * - Loading the page NEVER sends an unsubscribe request (protects against automated security scanners).
 * - Requires explicit user confirmation via the Confirm button.
 * - Double-submission is prevented and the button is disabled while submitting.
 * - Injects no-referrer and noindex meta tags on mount and cleans up on unmount.
 * - Never logs, stores or displays the raw token anywhere.
 */
function UnsubscribePage() {
  const [searchParams] = useSearchParams();
  const rawEmail = searchParams.get("email") || "";
  const rawToken = searchParams.get("token") || "";

  // Validate on initial render without making any network calls
  const validation = validateUnsubscribeParams(rawEmail, rawToken);

  const [status, setStatus] = useState(() => (validation.valid ? "idle" : "invalid"));
  const [message, setMessage] = useState(() =>
    validation.valid ? "" : MESSAGES.invalid
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // In-flight guard to strictly prevent double submission
  const inFlightRef = useRef(false);
  const statusHeadingRef = useRef(null);

  // Requirement 5: Set meta tags to prevent token leakage in Referer and prevent search indexing
  useEffect(() => {
    let referrerMeta = document.querySelector('meta[name="referrer"]');
    const createdReferrer = !referrerMeta;
    if (!referrerMeta) {
      referrerMeta = document.createElement("meta");
      referrerMeta.name = "referrer";
      document.head.appendChild(referrerMeta);
    }
    const prevReferrer = referrerMeta.content;
    referrerMeta.content = "no-referrer";

    let robotsMeta = document.querySelector('meta[name="robots"]');
    const createdRobots = !robotsMeta;
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.name = "robots";
      document.head.appendChild(robotsMeta);
    }
    const prevRobots = robotsMeta.content;
    robotsMeta.content = "noindex";

    return () => {
      if (createdReferrer) {
        referrerMeta.remove();
      } else {
        referrerMeta.content = prevReferrer;
      }
      if (createdRobots) {
        robotsMeta.remove();
      } else {
        robotsMeta.content = prevRobots;
      }
    };
  }, []);

  // Shift focus to message box for assistive technologies when result changes
  useEffect(() => {
    if (status !== "idle" && statusHeadingRef.current) {
      statusHeadingRef.current.focus?.();
    }
  }, [status]);

  const handleConfirm = async () => {
    if (!validation.valid || inFlightRef.current || isSubmitting) {
      return;
    }

    inFlightRef.current = true;
    setIsSubmitting(true);
    setStatus("submitting");

    const result = await submitUnsubscribe({
      email: validation.email,
      token: validation.token,
    });

    inFlightRef.current = false;
    setIsSubmitting(false);

    if (result.success) {
      setStatus("success");
      setMessage(result.message);
    } else if (result.status === 400 || result.status === 403) {
      setStatus("invalid");
      setMessage(result.message);
    } else if (result.status === 429) {
      setStatus("rate_limited");
      setMessage(result.message);
    } else {
      setStatus("error");
      setMessage(result.message);
    }
  };

  const masked = validation.valid ? maskEmail(validation.email) : "";

  return (
    <div className="flanora-unsubscribe-page">
      <main
        className="flanora-unsubscribe-card"
        aria-labelledby="unsubscribe-heading"
      >
        <span className="flanora-unsubscribe-kicker">Flanora AI Newsletter</span>
        <h1 id="unsubscribe-heading" className="flanora-unsubscribe-title">
          Unsubscribe
        </h1>

        {/* 1. Initial confirmation prompt */}
        {status === "idle" && (
          <div>
            <p className="flanora-unsubscribe-prompt">
              Unsubscribe{" "}
              <strong className="flanora-unsubscribe-masked-email">{masked}</strong>{" "}
              from Flanora AI newsletters?
            </p>
            <div className="flanora-unsubscribe-actions">
              <button
                type="button"
                className="flanora-unsubscribe-btn-primary"
                onClick={handleConfirm}
                disabled={isSubmitting}
                aria-label={`Confirm unsubscribe for ${masked}`}
              >
                Confirm
              </button>
              <Link
                to="/"
                className="flanora-unsubscribe-btn-secondary"
                rel="noreferrer"
              >
                Keep Subscription
              </Link>
            </div>
          </div>
        )}

        {/* 2. Submitting state */}
        {status === "submitting" && (
          <div
            role="status"
            aria-live="polite"
            className="flanora-unsubscribe-message-box"
          >
            <p>Unsubscribing {masked}…</p>
            <button
              type="button"
              className="flanora-unsubscribe-btn-primary"
              disabled
              style={{ marginTop: "16px" }}
            >
              Unsubscribing…
            </button>
          </div>
        )}

        {/* 3. Successful unsubscription */}
        {status === "success" && (
          <div
            role="status"
            aria-live="polite"
            tabIndex={-1}
            ref={statusHeadingRef}
            className="flanora-unsubscribe-message-box success"
          >
            <p>{message}</p>
          </div>
        )}

        {/* 4. Invalid or expired token (400, 403, or invalid params on load) */}
        {status === "invalid" && (
          <div
            role="alert"
            aria-live="assertive"
            tabIndex={-1}
            ref={statusHeadingRef}
            className="flanora-unsubscribe-message-box invalid"
          >
            <p>{message}</p>
          </div>
        )}

        {/* 5. Rate limited (429) */}
        {status === "rate_limited" && (
          <div>
            <div
              role="alert"
              aria-live="assertive"
              tabIndex={-1}
              ref={statusHeadingRef}
              className="flanora-unsubscribe-message-box rate-limited"
            >
              <p>{message}</p>
            </div>
            <div className="flanora-unsubscribe-actions">
              <button
                type="button"
                className="flanora-unsubscribe-btn-primary"
                onClick={handleConfirm}
                disabled={isSubmitting}
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* 6. Network or server error */}
        {status === "error" && (
          <div>
            <div
              role="alert"
              aria-live="assertive"
              tabIndex={-1}
              ref={statusHeadingRef}
              className="flanora-unsubscribe-message-box error"
            >
              <p>{message}</p>
            </div>
            <div className="flanora-unsubscribe-actions">
              <button
                type="button"
                className="flanora-unsubscribe-btn-primary"
                onClick={handleConfirm}
                disabled={isSubmitting}
              >
                Try again
              </button>
            </div>
          </div>
        )}

        <div className="flanora-unsubscribe-footer-links">
          <Link to="/" rel="noreferrer">
            ← Return to Flanora AI
          </Link>
        </div>
      </main>
    </div>
  );
}

export default UnsubscribePage;
