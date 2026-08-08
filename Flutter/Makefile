.PHONY: help install test analyze check

help:
	@echo "install  flutter pub get"
	@echo "test     flutter test"
	@echo "analyze  flutter analyze"
	@echo "check    analyze + test"

install:
	flutter pub get

test:
	flutter test

analyze:
	flutter analyze

check: analyze test
