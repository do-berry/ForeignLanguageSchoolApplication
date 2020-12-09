export const Language = {
    ENG: "angielski",
    GER: "niemiecki",
    ITA: "włoski",
    RUS: "rosyjski",
    NOR: "norweski",
}

export const getLanguageValue = (key) => {
    return Language[key];
}

export const LanguageLevel = {
    A1: "A1",
    A2: "A2",
    B1: "B1",
    B2: "B2",
    C1: "C1",
    C2: "C2",
}

export const getLanguageLevelValue = (key) => {
    return LanguageLevel[key];
}

export const Day = {
    D1: "poniedziałek",
    D2: "wtorek",
    D3: "środa",
    D4: "czwartek",
    D5: "piątek",
}

export const Group = {
    id: -1,
    room: 0,
    date_hour: 'null',
    date_day: null,
    language: null
}

export const Users = {
    users: []
}