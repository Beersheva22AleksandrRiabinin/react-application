import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

type Props = {
    title: string,
    content: string,
    confirmFn: (decision: boolean) => void
    open: boolean
}
const Confirm: React.FC<Props> = ({title, content, confirmFn: handleClose, open}) => {

    return <Box>
        <Dialog
            open={open}
            onClose={() => handleClose(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose(false)}>NO</Button>
                <Button onClick={() => handleClose(true)} autoFocus>YES</Button>
            </DialogActions>
        </Dialog>
    </Box>
}
export default Confirm