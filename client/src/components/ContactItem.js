import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import contactContext from '../contexts/contact/contactContext'

import { makeStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ButtonGroup from '@material-ui/core/ButtonGroup'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
    },
    badgeInfo: {
        textTransform: "none",
        textColor: "green"  // not working, should not use button here
    }
}))

const ContactItem = ({ data }) => {
    const context = useContext(contactContext)
    const { _id, name, email, phone, type } = data
    const classes = useStyles()

    const deleteContact = () => {
        context.deleteContact(_id)  // id was destructured from 'data' earlier
        context.clearCurrent()
    }
    

    return (
        <Paper className={classes.root}>
            <span>{name}</span>
            <Button
                disabled
                className={classes.badgeInfo}
            >
                {type}
            </Button>
            <List>
                {email && (
                    <React.Fragment key={'1'}>
                        <ListItem>
                            <i className="fas fa-envelope-open" />{email}
                        </ListItem>
                    </React.Fragment>)
                }
                {phone && (
                    <React.Fragment key={'2'}>
                        <ListItem>
                            <i className="fas fa-phone" />{phone}
                        </ListItem>
                    </React.Fragment>)
                }
            </List>
            <ButtonGroup fullWidth variant="contained">
                <Button color="primary" onClick={ () => context.setCurrent(data) }>Edit</Button>
                <Button onClick={ deleteContact }>Delete</Button>
            </ButtonGroup>
        </Paper>
    )
}

ContactItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.isRequired,
        name: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        type: PropTypes.string,
    }).isRequired,
}

export default ContactItem
