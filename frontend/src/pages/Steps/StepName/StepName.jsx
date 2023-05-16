import React, { useState } from 'react';
import Card from '../../../components/shared/Card/Card';
import TextInput from '../../../components/shared/TextInput/TextInput';
import Button from '../../../components/shared/Button/Button';
import styles from './StepName.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {setName} from '../../../store/activateSlice';


const StepName = ({ onNext }) => {
    const { name } = useSelector((state) => state.activate);
    const [fullname, setFullname] = useState('');
    const dispatch = useDispatch();

    function nextStep(){
        if(!fullname){
            return;
        }

        dispatch(setName(fullname));
        onNext();
    }

    return (
        <>
            <Card title="What’s your full name?" icon="goggle-emoji">
                <TextInput
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
                <p className={styles.paragraph}>
                    People use real names at Fergussonhouse:) !
                </p>
                <div>
                    <Button onClick={nextStep} text="Next" />
                </div>
            </Card>
        </>
    );
};

export default StepName;
