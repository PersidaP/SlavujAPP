import { Accordion, AccordionDetails, AccordionSummary, IconButton } from '@mui/material';
import InputAutocomplete, { IData } from '../../parts/InputAutocomplete/InputAutocomplete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import SelectedBuyerCard from '../SelectedBuyerCard.tsx/SelectedBuyerCard';
import { selectedBuyerAtom, selectedLocationAtom } from '../../../store/store';
import { useAtomValue } from 'jotai';
import './BuyerCard.styles.scss';

interface BuyerCardProps {
  autocompleteBuyers: Array<IData>;
  label: string;
  type: any;
  handleAutocompleteSelected: (_value: IData, _type: 'buyer' | 'product' | 'externalUser' | 'location') => void;
  selected: any;
  setSelected: any;
}

const BuyerCard = ({ autocompleteBuyers, handleAutocompleteSelected, label, type, selected, setSelected }: BuyerCardProps) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const selectedBuyer = useAtomValue(selectedBuyerAtom);
  const selectedLocation = useAtomValue(selectedLocationAtom);

  useEffect(() => {
    setSelected(type === 'location' ? selectedLocation : selectedBuyer);
  }, [selectedBuyer?.buyerId]);

  return (
    <Accordion className='buyer-card-accordion' expanded={isAccordionOpen}>
      <AccordionSummary
        expandIcon={
          <IconButton onClick={() => setIsAccordionOpen(selected.buyerId ? !isAccordionOpen : false)}>
            <ExpandMoreIcon />
          </IconButton>
        }
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <InputAutocomplete
          onChange={(e: any) => {
            handleAutocompleteSelected(e, type);
          }}
          className='buyer-card-accordion__summary'
          values={autocompleteBuyers}
          selectedValue={{ id: selected?.buyerId, name: selected?.buyerName }}
          type={type}
          label={label}
          clear={false}
        />
      </AccordionSummary>
      <AccordionDetails>{isAccordionOpen && selected?.buyerId && <SelectedBuyerCard selectedBuyer={selected} />}</AccordionDetails>
    </Accordion>
  );
};

export default BuyerCard;
