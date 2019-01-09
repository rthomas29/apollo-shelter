import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import RosterItem from './components/RosterItem'

const AnimalRoster = ({ animals }) => (
  <Fragment>
    <Typography variant="h2">Roster</Typography>
    <Grid container>
      <List name="dog">
        <RosterItem animals={animals} />
      </List>
    </Grid>
  </Fragment>
)

export default AnimalRoster
