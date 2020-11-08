import React, {useEffect, useState} from 'react'
import '../static/Header.css';


export const Header = () => {
    const [menu, setMenu] = useState([]);
    const [type, setType] = useState(null);

    const studentArray = [{'key': 'Wyloguj', 'value': '/logout'}, {'key': 'Profil', 'value': '/user/profile'}];
    const assistantArray = [{'key': 'Wyloguj', 'value': '/logout'}, {
        'key': 'Profil',
        'value': '/user/profile'
    }, {'key': 'Grupy', 'value': '/school/allgroups'},
        {'key': 'Nowa grupa', 'value': '/school/creategroup'}, {'key': 'Uzytkownicy', 'value': '/school/allusers'}, {
            'key': 'Nowy uzytkownik',
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