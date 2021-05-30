import React from "react";
import {connect} from "react-redux";

type Props = {};

export class Workspace extends React.PureComponent<Props> {

    render(): React.ReactNode {
        return 'Success'
    }
}


export default connect()(Workspace);
