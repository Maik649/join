(function () {
  const DAILY_LIMIT = 10;
  const STORAGE_PREFIX = "join_email_request_count_";

  document.addEventListener("DOMContentLoaded", initRequestQuotaUi);

  function initRequestQuotaUi() {
    const usedEl = document.getElementById("requestUsedCount");
    const limitEl = document.getElementById("requestLimitCount");
    const btn = document.getElementById("createEmailRequestBtn");

    if (!usedEl || !limitEl || !btn) return;

    limitEl.textContent = String(DAILY_LIMIT);

    const used = getTodayCount();
    usedEl.textContent = String(used);
    setButtonDisabledState(btn, used >= DAILY_LIMIT);
    btn.addEventListener("click", function () {
      if (btn.classList.contains("is-disabled")) return;
      const next = incrementTodayCount();
      usedEl.textContent = String(next);
      setButtonDisabledState(btn, next >= DAILY_LIMIT);
    });
  }

  function getTodayCount() {
    const raw = localStorage.getItem(getTodayStorageKey());
    const value = Number(raw || 0);
    if (!Number.isFinite(value) || value < 0) return 0;
    return Math.min(value, DAILY_LIMIT);
  }

  function incrementTodayCount() {
    const next = Math.min(getTodayCount() + 1, DAILY_LIMIT);
    localStorage.setItem(getTodayStorageKey(), String(next));
    return next;
  }

  function getTodayStorageKey() {
    const dateKey = new Date().toISOString().slice(0, 10);
    return STORAGE_PREFIX + dateKey;
  }

  function setButtonDisabledState(btn, disabled) {
    if (!btn) return;

    if (disabled) {
      btn.classList.add("is-disabled");
      btn.setAttribute("aria-disabled", "true");
      btn.title = "Daily request limit reached (10/10)";
      btn.addEventListener("click", blockDisabledClick);
      return;
    }

    btn.classList.remove("is-disabled");
    btn.removeAttribute("aria-disabled");
    btn.title = "";
    btn.removeEventListener("click", blockDisabledClick);
  }

  function blockDisabledClick(event) {
    event.preventDefault();
  }
})();
