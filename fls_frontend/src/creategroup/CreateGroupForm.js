import React, {useState} from 'react';
import {Day, Language, LanguageLevel} from "../stores/SchoolStore";
import {Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import './CreateGroup.css';

export const CreateGroupForm = () => {
    const [room, setRoom] = useState(0);
    const [dateHour, setDateHour] = useState('00:00:00');
    const [dateDay, setDateDay] = useState(Day.D1);
    const [languageName, setLanguageName] = useState(Language.ENG);
    const [languageLevel, setLanguageLevel] = useState(LanguageLevel.A1);
    const [cost, setCost] = useState(0);
    const [correctlySaved, setCorrectlySaved] = useState(false);
    const [init, setInit] = useState(true);

    function handleClick() {
        setInit(false);

        fetch('http://127.0.0.1:8000/school/creategroup', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                room: parseInt(room),
                date_hour: dateHour,
                date_day: dateDay,
                language: {
                    name: languageName,
                    level: languageLevel
                },
                cost: parseInt(cost)
            })
        }).then(res => {
            if (res.ok) {
                setCorrectlySaved(true);
            } else {
                setCorrectlySaved(false);
            }
        });
    }

    return (
        <div id='createGroupForm'>
            {correctlySaved && !init &&
            <Alert id='okAlert' bsStyle="warning">
                Grupa została utworzona.
            </Alert>
            }
            {!correctlySaved && !init &&
            <Alert id='okAlert' bsStyle="warning">
                Nie mozna utworzyć grupy.
            </Alert>
            }
            <Form>
                <FormGroup>
                    <Row>
                        <Col componentClass={ControlLabel} sm={2}>
                            Sala
                        </Col>
                        <Col sm={4}>
                            <FormControl
                                type="number"
                                value={room}
                                onChange={e => setRoom(e.target.value)}
                            />
                        </Col>
                        <Col componentClass={ControlLabel} sm={2}>
                            Godzina
                        </Col>
                        <Col sm={4}>
                            <FormControl
                                type="time"
                                value={dateHour}
                                onChange={e => setDateHour(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col componentClass={ControlLabel} sm={2}>
                            Cena [PLN]
                        </Col>
                        <Col sm={4}>
                            <FormControl
                                type="number"
                                step="0.01"
                                value={cost}
                                onChange={e => setCost(e.target.value)}
                            />
                        </Col>
                        <Col componentClass={ControlLabel} sm={2}>
                            Dzień
                        </Col>
                        <Col sm={4}>
                            <select className="form-control"
                                    value={dateDay}
                                    onChange={e => setDateDay(e.target.value)}>
                                {Object.keys(Day).map(item =>
                                    <option value={item}>{Day[item]}</option>
                                )}
                            </select>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col componentClass={ControlLabel} sm={2}>
                            Język
                        </Col>
                        <Col sm={4}>
                            <select className="form-control"
                                    value={languageName}
                                    onChange={e => setLanguageName(e.target.value)}>
                                {Object.keys(Language).map(item =>
                                    <option value={item}>{Language[item]}</option>
                                )}
                            </select>
                        </Col>
                        <Col componentClass={ControlLabel} sm={2}>
                            Poziom
                        </Col>
                        <Col sm={4}>
                            <select className="form-control"
                                    value={languageLevel}
                                    onChange={e => setLanguageLevel(e.target.value)}>
                                {Object.keys(LanguageLevel).map(item =>
                                    <option value={item}>{LanguageLevel[item]}</option>
                                )}
                            </select>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
            <Button bsStyle="info" onClick={handleClick}>
                Zapisz grupę
            </Button>
        </div>
    );
}