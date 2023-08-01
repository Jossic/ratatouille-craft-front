import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { useMenu } from '@ratatouille/modules/order/react/sections/menu/use-menu.hook';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

export const MenuSection: React.FC<{}> = ({}) => {
  const presenter = useMenu();
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant='h4'>Selectionnez vos plats</Typography>
      <Stack sx={{ marginTop: 2 }} gap={4}>
        {presenter.guests.map((guest) => (
          <GuestMenuComposer
            key={guest.id}
            guestId={guest.id}
            firstName={guest.firstName}
            lastName={guest.lastName}
            selectedEntryId={guest.menu.entry}
            selectedMainId={guest.menu.main}
            selectedDessertId={guest.menu.dessert}
            selectedDrinkId={guest.menu.drink}
            entries={presenter.getSelectableEntries(guest.id)}
            mains={presenter.getSelectableMains(guest.id)}
            desserts={presenter.getSelectableDesserts(guest.id)}
            drinks={presenter.getSelectableDrinks(guest.id)}
            onEntrySelect={presenter.assignEntry}
            onMainSelect={presenter.assignMain}
            onDessertSelect={presenter.assignDessert}
            onDrinkSelect={presenter.assignDrink}
          />
        ))}
      </Stack>
      <Grid container direction={'row'} alignItems={'center'} spacing={1} marginTop={2}>
        <Grid item>
          <Button variant={'contained'} color={'secondary'} onClick={presenter.onPrevious}>
            Retour
          </Button>
        </Grid>
        <Grid item>
          <Button variant={'contained'} color={'primary'} onClick={presenter.onNext} disabled={!presenter.isSubmitable}>
            Suivant
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const GuestMenuComposer: React.FC<{
  guestId: string;
  firstName: string;
  lastName: string;
  selectedEntryId: OrderingDomainModel.DishId | null;
  selectedMainId: OrderingDomainModel.DishId | null;
  selectedDessertId: OrderingDomainModel.DishId | null;
  selectedDrinkId: OrderingDomainModel.DishId | null;
  entries: OrderingDomainModel.Dish[];
  mains: OrderingDomainModel.Dish[];
  desserts: OrderingDomainModel.Dish[];
  drinks: OrderingDomainModel.Dish[];
  onEntrySelect: (guestId: string, id: string) => void;
  onMainSelect: (guestId: string, id: string) => void;
  onDessertSelect: (guestId: string, id: string) => void;
  onDrinkSelect: (guestId: string, id: string) => void;
}> = ({
  guestId,
  firstName,
  lastName,
  selectedEntryId,
  selectedMainId,
  selectedDessertId,
  selectedDrinkId,
  entries,
  mains,
  desserts,
  drinks,
  onEntrySelect,
  onMainSelect,
  onDessertSelect,
  onDrinkSelect,
}) => {
  return (
    <Stack rowGap={2}>
      <Typography variant='h6'>
        {firstName} {lastName}
      </Typography>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Entrée</InputLabel>
        <Select
          label='Entrée'
          value={selectedEntryId ?? undefined}
          onChange={(event: SelectChangeEvent) => {
            onEntrySelect(guestId, event.target.value as string);
          }}
        >
          {entries.map((dish) => (
            <MenuItem key={dish.id} value={dish.id}>
              {dish.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>{' '}
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Plat Principal</InputLabel>
        <Select
          required
          label='Plat Principal*'
          value={selectedMainId ?? undefined}
          onChange={(event: SelectChangeEvent) => {
            onMainSelect(guestId, event.target.value as string);
          }}
        >
          {mains.map((dish) => (
            <MenuItem key={dish.id} value={dish.id}>
              {dish.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Dessert</InputLabel>
        <Select
          label='Plat Principal'
          value={selectedDessertId ?? undefined}
          onChange={(event: SelectChangeEvent) => {
            onDessertSelect(guestId, event.target.value as string);
          }}
        >
          {desserts.map((dish) => (
            <MenuItem key={dish.id} value={dish.id}>
              {dish.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Boisson</InputLabel>
        <Select
          label='Boisson'
          value={selectedDrinkId ?? undefined}
          onChange={(event: SelectChangeEvent) => {
            onDrinkSelect(guestId, event.target.value as string);
          }}
        >
          {drinks.map((dish) => (
            <MenuItem key={dish.id} value={dish.id}>
              {dish.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};
