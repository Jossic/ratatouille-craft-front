import { Box, Button, CardActionArea, Grid, Typography, Card } from '@mui/material';
import { useTable } from '@ratatouille/modules/order/react/sections/table/use-table.hook';

const SelectableTable: React.FC<{ name: string; isSelected: boolean; onSelect: () => void }> = ({ isSelected, name, onSelect }) => {
  return (
    <CardActionArea onClick={onSelect}>
      <Card sx={{ padding: 4 }} elevation={isSelected ? 6 : 1}>
        <Typography variant='h6' fontWeight={isSelected ? 700 : undefined}>
          {name}
        </Typography>
      </Card>
    </CardActionArea>
  );
};

export const TableSection: React.FC<{}> = ({}) => {
  const presenter = useTable();
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant='h6'>Selectionnez une Table</Typography>
      <Grid container sx={{ marginTop: 2 }} columnSpacing={2} rowSpacing={2}>
        {presenter.availableTables.map((table) => (
          <Grid key={table.id} item xs={4}>
            <SelectableTable name={table.name} isSelected={presenter.assignedTableId === table.id} onSelect={() => presenter.assignTable(table.id)} />
          </Grid>
        ))}
      </Grid>
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
