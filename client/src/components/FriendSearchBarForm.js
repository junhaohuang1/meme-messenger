import React from 'react';
import PropTypes from 'prop-types'
// import {Link} from 'react-router-dom';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const FriendSearchBarForm = (props) => (
  <Card className="container" style = {{display:'flex'}}>
    <form action="#" onSubmit={props.onSubmit}>
      <div className="field-line" style = {{flex:1}}>
        <TextField
          floatingLabelText="Search Friend Here By Email"
          name="email"
          onChange={props.onChange}
          value={props.email}
        />
      </div>

      {/* <div className="button-line">*/}
      <RaisedButton style = {{flex:1}} type="submit" label="Search Friend" primary />
      {/*</div>*/}

    </form>
  </Card>
);

FriendSearchBarForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  successMessage: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default FriendSearchBarForm;
