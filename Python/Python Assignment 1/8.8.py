try:
    int("abc")
except ValueError as e:
    raise RuntimeError("Conversion failed") from e