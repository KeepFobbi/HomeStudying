import React from 'react';
import { connect, } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions as lesonsActions } from '../actions'
import { actions as rootActions } from '../../Root/actions'
//import { actions as rootActions } from '../actions'
import { NAME as LESONS } from '../reducer'
import SearchedTable from "../../../components/SearchedTable"

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



function mapStateToProps(state) { //connection to staTE
  return {
    ...state[LESONS],
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...lesonsActions,
  redirectTo: rootActions.redirectTo
}, dispatch)

class TopicsList extends React.Component {
  constructor(props) {
    props.getTopicList()
    super(props);
    this.state = {
      gridItemStyle: {}
    }
  }
  render() {
    return (
      <>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <SearchedTable tableDescription={{
              columns: this.props.topicColumns,
              data: this.props.topicData
            }}
              clickAction={(rowData, rowMeta) => {
                //console.log(rowData)
                this.props.redirectTo("/material?topicId=" + rowData[0] + '&subjectId=' + rowData[1])
                // let id = rowData[0]
                // this.props.editMonitorAction(id)
                //this.props.setCurrentCompany(id)
              }}
            />
          </Grid> </Grid>
      </>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopicsList)