import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }
});

function Landing(props) {
    const { classes } = props;
  
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
                <img src='/assets/images/headphones.jpg' alt='man wearing headphones' />
                <h2>Turn the music up!</h2>
            </Paper>
            
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
                <h4>Choose your music</h4>
                <p>The world is full of music; why should you have to listen to music that someone else chose?</p>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
                <h4>Unlimited, streaming, ad-free</h4>
                <p>No arbitrary limits. No distractions</p>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
                <h4>Mobile enabled</h4>
                <p>Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
}
  
Landing.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Landing);