import { Accordion, AccordionDetails, AccordionSummary, IconButton } from '@mui/material';
import InputAutocomplete, { IData } from '../../parts/InputAutocomplete/InputAutocomplete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import SelectedBuyerCard from '../SelectedBuyerCard.tsx/SelectedBuyerCard';
import { selectedBuyerAtom } from '../../../store/store';
import { useAtomValue } from 'jotai';
import './BuyerCard.styles.scss';

interface BuyerCardProps {
  autocompleteBuyers: Array<IData>;
  handleAutocompleteSelected: (_value: IData, _type: 'buyer' | 'product' | 'externalUser') => void;
}

const BuyerCard = ({ autocompleteBuyers, handleAutocompleteSelected }: BuyerCardProps) => {
  const selectedBuyer = useAtomValue(selectedBuyerAtom);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  return (
    <Accordion className='buyer-card-accordion' expanded={isAccordionOpen}>
      <AccordionSummary
        expandIcon={
          <IconButton onClick={() => setIsAccordionOpen(selectedBuyer.buyerId ? !isAccordionOpen : false)}>
            <ExpandMoreIcon />
          </IconButton>
        }
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <InputAutocomplete
          onChange={handleAutocompleteSelected}
          className='buyer-card-accordion__summary'
          values={autocompleteBuyers}
          selectedValue={{ id: selectedBuyer.buyerId, name: selectedBuyer.buyerName }}
          type='buyer'
          label='Izaberite kupca'
          clear={false}
        />
      </AccordionSummary>
      <AccordionDetails>{isAccordionOpen && selectedBuyer.buyerId && <SelectedBuyerCard selectedBuyer={selectedBuyer} />}</AccordionDetails>
    </Accordion>
  );
};

export default BuyerCard;
