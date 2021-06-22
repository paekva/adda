import {connect} from "react-redux";
import React from "react";
import {Status, statusToStringMap} from "../../types";
import './OrderPage.css';
import {ReactComponent as Logo} from './status.svg';

const StatusPanel = (props: { statusList: Status[], current: Status }): JSX.Element => {
    return <div className='status' style={{fontSize: 18}}>
        {props.statusList.map((el) => {
            return <div className='statusElement' style={{color: el === props.current ? 'black' : 'gray'}}>
                <Logo
                    fill={props.current.startsWith(el)
                        ? (props.current.includes('WAIT')
                            ? 'yellow'
                            : props.current.includes('ERROR')
                                ? 'red'
                                : 'green')
                        : 'gray'}/>
                {statusToStringMap[el.toString()]}
            </div>
        })}
    </div>
}

export default connect()(StatusPanel)