from enum import Enum


class Language(Enum):
    ENG = "angielski"
    GER = "niemiecki"
    ITA = "wloski"
    RUS = "rosyjski"
    NOR = "norweski"


class LanguageLevel(Enum):
    A1 = "A1"
    A2 = "A2"
    B1 = "B1"
    B2 = "B2"
    C1 = "C1"
    C2 = "C2"


class Day(Enum):
    D1 = "Monday"
    D2 = "Tuesday"
    D3 = "Wednesday"
    D4 = "Thursday"
    D5 = "Friday"
