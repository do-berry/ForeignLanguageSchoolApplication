import React, {useEffect, useState} from 'react'
import '../static/Header.css';


export const Header = () => {
    const [menu, setMenu] = useState([]);

    const studentArray = [{'key': 'Wyloguj', 'value': '/logout'}, {'key': 'Profil', 'value': '/user/profile'}];
    const assistantArray = [{'key': 'Wyloguj', 'value': '/logout'}, {'key': 'Grupy', 'value': '/school/allgroups'},
        {'key': 'Nowa grupa', 'value': '/school/creategroup'}, {'key': 'Uzytkownicy', 'value': '/school/allusers'}, {
            'key': 'Nowy uzytkownik',
            'value': '/register'
        }];
    const teacherArray = [{'key': 'Wyloguj', 'value': '/logout'}, {'key': 'Profil', 'value': '/user/profile'}];
    const notLogged = [{'key': 'Zaloguj', 'value': '/login'}];

    useEffect(() => {
        if (sessionStorage.getItem('userType') === null) {
            setMenu(notLogged);
        } else {
            if (sessionStorage.getItem('userType') === "STUDENT") {
                setMenu(studentArray);
            } else if (sessionStorage.getItem('userType') === "TEACHER") {
                setMenu(teacherArray);
            } else {
                setMenu(assistantArray);
            }
        }
    }, []);

    return (
        <div class="page-header">
            <MenuList menu={menu}/>
        </div>
    );
}

function MenuList(props) {
    return (
        <ul>
            {props.menu.map((item) =>
                <li><a
                    key={item.key}
                    href={item.value.toLowerCase().replace(/ /g, '')}
                    id={item.key}>
                    {item.key}</a></li>
            )}
        </ul>
    );
}