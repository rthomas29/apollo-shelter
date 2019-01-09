import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import bulldog from '../../bulldog.jpeg'

const AnimalRoster = ({ animals }) => (
  <Fragment>
    <Typography variant="h2">Roster</Typography>
    <Grid container>
      <List name="dog">
        {animals.map(animal => (
          <ListItem key={animal.name} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="animal" src={bulldog} />
            </ListItemAvatar>
            <ListItemText
              primary={animal.name}
              secondary={
                <Fragment>
                  <Typography component="span">
                    {animal.color} | {animal.weight} lbs
                  </Typography>
                </Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </Grid>
  </Fragment>
)

export default AnimalRoster
