import Image from 'next/image';
import React, { FC, useState } from 'react';
import Swal from 'sweetalert2';
import { firstLetterToCapitalize } from '../../helpers';
import { Match } from '../../interfaces';
import { MatchItem } from '../Fixture.module';

interface Props {
    local: any;
    visitor: any;
    id: string
    setDataMatch: (dataMatch: Match) => void;
}

export const CreateMatchItem: FC<Props> = ({ id, local, visitor, setDataMatch }) => {

    const [matchValues, setMatchValues] = useState({ local, visitor });
    const { local: thisLocal, visitor: thisVisitor } = matchValues;

    const handleOnChange = ({ target }: any) => {
        const name = (target.name === 'local') ? local.name : visitor.name

        setMatchValues({
            ...matchValues,
            [target.name]: {
                name,
                goals: target.value
            }
        });

        /*TODO: hacer que funcione
        if (parseInt(target.value) < 0) {
            return Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Ingresa un numero valido!',
            });
        }*/

        const currentMatchData: Match = {
            ...matchValues,
            id,
            [target.name]: {
                name,
                goals: (target.value === '') ? 0 : parseInt(target.value)
            }
        }

        setDataMatch(currentMatchData);
    }
    return (
        <form>
            <MatchItem>
                <div>
                    <Image width={'25px'} height={'25px'}
                        src={
                            (thisLocal.name.length > 12) ?
                                require(`../../assets/flags/no-flag.png`)
                                :
                                require(`../../assets/flags/${thisLocal.name}.png`)
                        } />
                    <p>{firstLetterToCapitalize(thisLocal.name)}</p>
                </div>

                <input name={'local'} type={'number'}
                    value={thisLocal.goals}
                    onChange={handleOnChange}
                    placeholder={'0'}
                    min={0}
                    max={20}
                />
                <input name={'visitor'} type={'number'}
                    value={thisVisitor.goals}
                    onChange={handleOnChange}
                    placeholder={'0'}
                    min={0}
                    max={20}
                />
                <div>
                    <Image width={'25px'} height={'25px'}
                        src={
                            (thisVisitor.name.length > 12) ?
                                require(`../../assets/flags/no-flag.png`)
                                :
                                require(`../../assets/flags/${thisVisitor.name}.png`)
                        } />
                    <p>{firstLetterToCapitalize(thisVisitor.name)}</p>
                </div>
            </MatchItem>
        </form>
    )
}
