
import { connect, ConnectedProps, useSelector } from 'react-redux';

interface RootState {
    isOn: boolean
}

const selectIsOn = (state: RootState) => state.isOn;
const isOn = useSelector(selectIsOn);

const mapState = (state: RootState) => ({
    isOn: state.isOn
});

const mapDispatch = {
    toggleOn: () => ({type: 'TOGGLE_IS_ON'})
}

const connector = connect(
    mapState,
    mapDispatch
)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
    backgroundColor: string
}

const MyComponent = (props: Props) => (
    <div style={{ backgroundColor: props.backgroundColor }}>
        <button onClick={props.toggleOn}>
        Toggle is {props.isOn ? 'ON' : 'OFF'}
        </button>
    </div>
);
  
export default connector(MyComponent);



