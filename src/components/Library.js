import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

const styles = theme => ({
    card: {
        maxWidth: 345,
    },
        media: {
        height: 140,
    },
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }
});

class Library extends Component {
    state = { 
        albums: albumData 
    };
  
    render() {
        const { classes } = this.props;
        
        return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                { 
                    this.state.albums.map( (album, index) =>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia 
                                            className={classes.media}
                                            image={album.albumCover}
                                            title={album.title}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                <div>{album.title}</div>
                                            </Typography>
                                            <Typography component="p">
                                                <div>{album.title}</div>
                                                <div>{album.artist}</div>
                                                <div>{album.songs.length} songs</div>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Listen
                                        </Button>
                                    </CardActions>
                                </Card>
                                
                                <Link to={`/album/${album.slug}`} key={index}>
                                </Link>

                            </Paper>
                        </Grid>
                    )
                }
            </Grid>
        </div>
        );
    }
}
  
Library.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Library);