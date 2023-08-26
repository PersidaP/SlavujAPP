import { Accordion, AccordionDetails, AccordionSummary, IconButton } from '@mui/material';
import InputAutocomplete, { IData } from '../../parts/InputAutocomplete/InputAutocomplete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { selectedExternalUserAtom } from '../../../store/store';
import { useAtomValue } from 'jotai';
import './ExternalUserCard.styles.scss';
import SelectedExternalUserCard from '../SelectedExternalUserCard/SelectedExternalUserCard';

interface ExternalUserCardProps {
  autocompleteExternalUsers: Array<IData>;
  handleAutocompleteSelected: (_value: IData, _type: 'buyer' | 'product' | 'externalUser') => void;
}

const ExternalUserCard = ({ autocompleteExternalUsers, handleAutocompleteSelected }: ExternalUserCardProps) => {
  const selectedExternalUser = useAtomValue(selectedExternalUserAtom);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <Accordion className='external-user-card-accordion' expanded={isAccordionOpen}>
      <AccordionSummary
        expandIcon={
          <IconButton
            onClick={() => {
              setIsAccordionOpen(selectedExternalUser.userId ? !isAccordionOpen : false);
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <InputAutocomplete
          onChange={handleAutocompleteSelected}
          className='external-user-card-accordion__summary'
          values={autocompleteExternalUsers}
          type='externalUser'
          label='Izaberite korisnika'
          clear={false}
        />
      </AccordionSummary>
      <AccordionDetails>
        {isAccordionOpen && selectedExternalUser.user && <SelectedExternalUserCard selectedExternalUser={selectedExternalUser} />}
      </AccordionDetails>
    </Accordion>
  );
};

export default ExternalUserCard;
