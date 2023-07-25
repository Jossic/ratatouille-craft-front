'use client';

import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, TextField, Typography } from '@mui/material';
import { useGuestsSection } from '@ratatouille/modules/order/react/sections/guest/use-guests-section';
import DeleteIcon from '@mui/icons-material/Delete';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

export const GuestsSection: React.FC<{}> = ({}) => {
  const { addGuest, removeGuest, updateGuest, isSubmitable, form, onNext, changeOrganizer } = useGuestsSection();

  console.log('isSubmitable =>', isSubmitable);
  return (
    <Box>
      <Typography>Guests</Typography>
      <Grid sx={{ paddingTop: 2 }} rowSpacing={4}>
        {form.guests.map((guest, index) => (
          <Box key={guest.id}>
            <GuestRow
              id={guest.id}
              firstName={guest.firstName}
              lastName={guest.lastName}
              age={guest.age}
              isOrganizer={guest.id === form.organizerId}
              onChange={updateGuest}
              changeOrganizer={changeOrganizer}
              remove={removeGuest}
            />
          </Box>
        ))}
      </Grid>

      <Grid container direction={'row'} alignItems={'center'} spacing={1} marginTop={2}>
        <Grid item>
          <Button variant={'contained'} onClick={addGuest}>
            Ajouter
          </Button>
        </Grid>
        <Grid item>
          <Button variant={'contained'} onClick={onNext} disabled={!isSubmitable}>
            Suivant
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const GuestRow: React.FC<{
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  isOrganizer: boolean;
  onChange: <T extends keyof OrderingDomainModel.Guest>(id: string, key: T, value: OrderingDomainModel.Guest[T]) => void;
  changeOrganizer: (id: string) => void;
  remove: (id: string) => void;
}> = ({ id, firstName, lastName, age, isOrganizer, onChange, changeOrganizer, remove }) => {
  return (
    <Box>
      <Grid container direction={'row'} alignItems={'center'} spacing={1}>
        <Grid item>
          <FormControl>
            <FormLabel>Prénom</FormLabel>
            <TextField value={firstName} onChange={(e) => onChange(id, 'firstName', e.target.value)} />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Nom</FormLabel>
            <TextField value={lastName} onChange={(e) => onChange(id, 'lastName', e.target.value)} />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Age</FormLabel>
            <TextField value={age} onChange={(e) => onChange(id, 'age', parseInt(e.target.value))} />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Checkbox checked={isOrganizer} onChange={(e) => changeOrganizer(id)} name='checkedB' color='primary' />}
            label={'Organisateur'}
          ></FormControlLabel>
        </Grid>
        <Box sx={{ marginTop: 2 }}>
          <Button variant={'contained'} onClick={() => remove(id)} color={'error'} startIcon={<DeleteIcon />}>
            Supprimer
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};
