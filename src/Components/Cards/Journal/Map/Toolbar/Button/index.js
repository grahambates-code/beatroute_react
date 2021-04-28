import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
    fab: {
        width: 32,
        height: 32,
        minHeight: 32,
        lineHeight: 1,
        '& svg': {
            fontSize: '1.2rem'
        }
    },
    fabIcon: {
        display: 'flex',
        height: '100%'
    },
    tooltipPopper: {
        position: 'relative',
    }
}));

const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
];

export function Button() {
    const classes = useStyles();
    const [direction, setDirection] = React.useState('left');
    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);

    const handleDirectionChange = (event) => {
        setDirection(event.target.value);
    };

    const handleHiddenChange = (event) => {
        setHidden(event.target.checked);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <SpeedDial
            ariaLabel="SpeedDial example"
            hidden={hidden}
            icon={<SpeedDialIcon classes={{ root: classes.fabIcon }}  />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction={direction}
            classes={{
                fab: classes.fab,
                
            }}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={handleClose}
                    PopperProps={{
                        className: classes.tooltipPopper
                    }}
                    tooltipPlacement="bottom"
                />
            ))}
        </SpeedDial>
    );
}
