import React, {useEffect, useState} from 'react'
import '../static/Header.css';


const UType = {
    STUDENT: 'Słuchacz',
    TEACHER: 'Lektor',
    CUSTOMER_ASSISTANT: 'Doradca klienta'
};

function returnValue(val) {
    if (val === "STUDENT") {
        return UType.STUDENT;
    } else if (val === "TEACHER") {
        return UType.TEACHER;
    } else if (val === "CUSTOMER_ASSISTANT") {
        return UType.CUSTOMER_ASSISTANT;
    } else {
        return null;
    }
}

export const Header = () => {
    const [menu, setMenu] = useState([]);
    const [type, setType] = useState(null);

    const studentArray = [{'key': 'Wyloguj', 'value': '/logout'}, {'key': 'Profil', 'value': '/user/profile'}];
    const assistantArray = [{'key': 'Wyloguj', 'value': '/logout'}, {
        'key': 'Profil',
        'value': '/user/profile'
    }, {'key': 'Grupy', 'value': '/school/allgroups'},
        {'key': 'Nowa grupa', 'value': '/school/creategroup'}, {'key': 'Użytkownicy', 'value': '/school/allusers'}, {
            'key': 'Nowy użytkownik',
            'value': '/register'
        }];
    const teacherArray = [{'key': 'Wyloguj', 'value': '/logout'}, {'key': 'Profil', 'value': '/user/profile'}];
    const notLogged = [{'key': 'Zaloguj', 'value': '/login'}];

    useEffect(() => {
        if (sessionStorage.getItem('userType') === null) {
            setMenu(notLogged);
            setType(null);
        } else {
            if (sessionStorage.getItem('userType') === "STUDENT") {
                setMenu(studentArray);
                setType("STUDENT");
            } else if (sessionStorage.getItem('userType') === "TEACHER") {
                setMenu(teacherArray);
                setType("TEACHER");
            } else {
                setMenu(assistantArray);
                setType("CUSTOMER_ASSISTANT");
            }
        }
    }, []);

    return (
        <div class="sidenav">
            {menu.length > 1 && <div id='userInfo'>
                <p>Zalogowany użytkownik: {sessionStorage.getItem('username')}</p>
                <p>Typ użytkownika: {returnValue(sessionStorage.getItem('userType'))}</p>
            </div>}
            <br/>
            {menu.map((item) =>
                <a
                    key={item.key}
                    href={item.value.toLowerCase().replace(/ /g, '')}
                    id={item.key}>
                    {item.key}</a>
            )}
        </div>
    );
}

function MenuList(props) {
    return (
        <ul>
            {props.menu.map((item) =>
                <a
                    key={item.key}
                    href={item.value.toLowerCase().replace(/ /g, '')}
                    id={item.key}>
                    {item.key}</a>
            )}
        </ul>
    );
}