"""Public Pydantic v2 schemas for the YAML contracts either half of a design
is written in.

The three the PIPELINE owns — `app.yaml` (`AppFormat`), `customization.yaml`
(`Customization`) and the produced `output.yaml` (`Output`) — plus
`MockupSpec`, which is the contract for the LAYOUT half: a mock app's
`mockup.yaml` over in `RecomposeJsxMockUps/src/apps/<id>/`. That one describes
no pipeline artifact and nothing in `ThemeTree/` reads it; it is here because a
contract belongs with the other contracts, and because this is the only place
in the repo with both a YAML parser and a schema to validate it against.
"""

from schema.app_format import AppFormat
from schema.color_mode import ColorMode
from schema.color_role import ColorRole
from schema.complexity import Complexity
from schema.customization import ColorsDirection, Customization, DesignDirection
from schema.mockup import MockupSpec
from schema.output import (
    ColorOutput,
    ColorPalette,
    ColorValue,
    Derivations,
    ExpansionCostLog,
    ExpansionEntry,
    ExpansionKind,
    FontOutput,
    FontSet,
    FormatOutput,
    FormatSet,
    IconAttribution,
    IconOutput,
    IconSet,
    ImageOutput,
    ImageSet,
    ImageToImage,
    NodeOutput,
    Output,
    OverwriteSpecs,
    RunCost,
    TextOutput,
    TextSet,
)
from schema.primitives import (
    AbsolutePath,
    HexColor,
    HslColor,
    OklchColor,
    PathSegment,
    RgbColor,
)
from schema.slots import (
    ColorSlot,
    FontSlot,
    FormatSlot,
    FormatValue,
    IconSlot,
    ImageSlot,
    SlotBase,
    TextSlot,
)

__all__ = [
    "AbsolutePath",
    "AppFormat",
    "ColorMode",
    "ColorOutput",
    "ColorPalette",
    "ColorRole",
    "ColorSlot",
    "ColorValue",
    "ColorsDirection",
    "Complexity",
    "Customization",
    "Derivations",
    "DesignDirection",
    "ExpansionCostLog",
    "ExpansionEntry",
    "ExpansionKind",
    "FontOutput",
    "FontSet",
    "FontSlot",
    "FormatOutput",
    "FormatSet",
    "FormatSlot",
    "FormatValue",
    "HexColor",
    "HslColor",
    "IconAttribution",
    "IconOutput",
    "IconSet",
    "IconSlot",
    "ImageOutput",
    "ImageSet",
    "ImageSlot",
    "ImageToImage",
    "MockupSpec",
    "NodeOutput",
    "OklchColor",
    "Output",
    "OverwriteSpecs",
    "PathSegment",
    "RgbColor",
    "RunCost",
    "SlotBase",
    "TextOutput",
    "TextSet",
    "TextSlot",
]
