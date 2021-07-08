import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Menu, Dropdown } from 'antd';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
    root: {
        maxWidth: 345
    },
    media: {
        width: '100%',
        position: 'relative',
        paddingBottom: props => props.heightToWidthRatio,
        paddingTop: '0',
        height: 0
    },
    elementToStretch: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    imgStyle: {
        objectFit: 'contain',
        width: '100%',
        height: '100%'
    }
});

const menu = (
    <Menu>
        <Menu.Item key="1">delete state</Menu.Item>
    </Menu>
);


const ImgCard = (props) =>  {
    const { imgSrc, contentNode } = props;
    const classes = useStyles(props);

    return (
        <Card
            variant="outlined"
            className={classes.root}>
            <Dropdown overlay={menu} trigger={['contextMenu']}>
            <CardMedia className={classes.media}>
                    <div className={classes.elementToStretch}>
                        <img
                            draggable
                            className={classes.imgStyle}
                            src={imgSrc}
                            alt="img"
                        />
                    </div>
                </CardMedia>
            </Dropdown>
            {contentNode}
        </Card>
    );
}


export default ImgCard;
