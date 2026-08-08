.PHONY: help install check test ThemeTree Backend Flutter React JsxMockUps Studio

# Root delegates. Every subsystem owns its own Makefile and its own dependencies;
# this file only fans out to them. Anything subsystem-specific belongs in that
# subsystem's Makefile, not here.

SUBSYSTEMS := ThemeTree Backend Flutter React JsxMockUps Studio

help:
	@echo "make install         install every subsystem"
	@echo "make check           typecheck + lint + test across every subsystem"
	@echo "make test            test across every subsystem"
	@echo "make <Subsystem>     that subsystem's help"
	@echo ""
	@echo "Subsystems: $(SUBSYSTEMS)"
	@echo ""
	@echo "Common loops:"
	@echo "  make -C JsxMockUps dev  the mock assets, unthemed (no backend)"
	@echo "  make -C Backend dev         the read-only API"
	@echo "  make -C Studio dev      the theme browser (needs the API running)"
	@echo "  make -C ThemeTree smoke          a cheap end-to-end pipeline run"

install:
	@for d in $(SUBSYSTEMS); do echo "==> $$d"; $(MAKE) -C $$d install || exit 1; done

check:
	@for d in $(SUBSYSTEMS); do echo "==> $$d"; $(MAKE) -C $$d check || exit 1; done

test:
	@for d in $(SUBSYSTEMS); do echo "==> $$d"; $(MAKE) -C $$d test || exit 1; done

$(SUBSYSTEMS):
	@$(MAKE) -C $@ help
