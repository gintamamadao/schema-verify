class ErrorHint {
    safeErrorHint(e) {
        return typeof e === "string" ? e : e && e.message ? e.message : "未知";
    }
}

export default ErrorHint;
