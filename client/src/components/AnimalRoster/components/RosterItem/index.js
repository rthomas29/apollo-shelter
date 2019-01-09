import React, { Fragment } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import bulldog from '../../../../bulldog.jpeg'
const RosterItem = ({ animals }) => {
  return animals.map(animal => (
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
  ))
}

export default RosterItem
