.PHONY: help install check test ThemeTree RecomposeAPI RecomposeFlutter RecomposeReact RecomposeJsxMockUps RecomposeStudio

# Root delegates. Every subsystem owns its own Makefile and its own dependencies;
# this file only fans out to them. Anything subsystem-specific belongs in that
# subsystem's Makefile, not here.

SUBSYSTEMS := ThemeTree RecomposeAPI RecomposeFlutter RecomposeReact RecomposeJsxMockUps RecomposeStudio

help:
	@echo "make install         install every subsystem"
	@echo "make check           typecheck + lint + test across every subsystem"
	@echo "make test            test across every subsystem"
	@echo "make <Subsystem>     that subsystem's help"
	@echo ""
	@echo "Subsystems: $(SUBSYSTEMS)"
	@echo ""
	@echo "Common loops:"
	@echo "  make -C RecomposeAPI dev        the read-only API"
	@echo "  make -C RecomposeStudio dev     the theme browser (needs the API running)"
	@echo "  make -C ThemeTree smoke         a cheap end-to-end pipeline run"

install:
	@for d in $(SUBSYSTEMS); do echo "==> $$d"; $(MAKE) -C $$d install || exit 1; done

check:
	@for d in $(SUBSYSTEMS); do echo "==> $$d"; $(MAKE) -C $$d check || exit 1; done

test:
	@for d in $(SUBSYSTEMS); do echo "==> $$d"; $(MAKE) -C $$d test || exit 1; done

$(SUBSYSTEMS):
	@$(MAKE) -C $@ help
