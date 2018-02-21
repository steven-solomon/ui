import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import RefreshingGraph from 'shared/components/RefreshingGraph'
import buildQueries from 'utils/buildQueriesForGraphs'
import VisualizationName from 'src/dashboards/components/VisualizationName'

import {stringifyColorValues} from 'src/dashboards/constants/gaugeColors'

const DashVisualization = (
  {
    axes,
    type,
    templates,
    timeRange,
    autoRefresh,
    queryConfigs,
    editQueryStatus,
    resizerTopHeight,
    singleStatColors,
  },
  {source: {links: {proxy}}}
) => {
  // const colors = type === 'gauge' ? gaugeColors : singleStatColors

  return (
    <div className="graph">
      <VisualizationName />
      <div className="graph-container">
        <RefreshingGraph
          colors={stringifyColorValues(singleStatColors)}
          axes={axes}
          type={type}
          queries={buildQueries(proxy, queryConfigs, timeRange)}
          templates={templates}
          autoRefresh={autoRefresh}
          editQueryStatus={editQueryStatus}
          resizerTopHeight={resizerTopHeight}
        />
      </div>
    </div>
  )
}

const {arrayOf, func, number, shape, string} = PropTypes

DashVisualization.propTypes = {
  type: string.isRequired,
  autoRefresh: number.isRequired,
  templates: arrayOf(shape()),
  timeRange: shape({
    upper: string,
    lower: string,
  }).isRequired,
  queryConfigs: arrayOf(shape({})).isRequired,
  editQueryStatus: func.isRequired,
  axes: shape({
    y: shape({
      bounds: arrayOf(string),
    }),
  }),
  resizerTopHeight: number,
  singleStatColors: arrayOf(
    shape({
      type: string.isRequired,
    }).isRequired
  ).isRequired,
}

DashVisualization.contextTypes = {
  source: PropTypes.shape({
    links: PropTypes.shape({
      proxy: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

const mapStateToProps = ({
  cellEditorOverlay: {singleStatColors, cell: {type}},
}) => ({
  singleStatColors,
  type,
})

export default connect(mapStateToProps, null)(DashVisualization)
