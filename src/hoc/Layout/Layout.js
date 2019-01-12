import React, {Component} from 'react';
import './Layout.scss'
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu'

export default class Layout extends Component{
    render() {
        return (
            <div className="Layout">
                <HeaderMenu />
                <main className="main">
                    {this.props.children}
                </main>
            </div>
        )
    }
}