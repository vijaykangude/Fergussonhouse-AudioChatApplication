import React from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';

const Home = () => {
    const navigate = useNavigate();

    function startRegister() {
        navigate('/authenticate');
    }
    return (
        <div className={styles.cardWrapper}>
            <Card title="Welcome to Fergussonhouse!" icon="logo">
                <p className={styles.text}>
                Connect with fellow Ferguson College students and join live discussions with our social audio app
                </p>
                <div>
                    <Button onClick={startRegister} text="Let's Go" />
                </div>
                <div className={styles.signinWrapper}>
                    <span className={styles.hasInvite}>
                        Have an invite text?
                    </span>
                </div>
            </Card>
        </div>
    );
};

export default Home;
