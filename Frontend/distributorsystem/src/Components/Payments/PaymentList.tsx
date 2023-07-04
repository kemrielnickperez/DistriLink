import { Autocomplete, Box, Container, FormLabel, Stack, TextField, Table, TableRow, TableBody, TableCell, TableContainer, styled, TableHead, Typography, Paper, Grid, Button, Card, makeStyles, createStyles } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import NavBar from "../../Global Components/NavBar";


export default function PaymentList() {
    const headerClassName = "custom-header"

    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's    List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 },
        {
            label: 'The Lord of the Rings: The Return of the King',
            year: 2003,
        },
        { label: 'The Good, the Bad and the Ugly', year: 1966 },
        { label: 'Fight Club', year: 1999 },
        {
            label: 'The Lord of the Rings: The Fellowship of the Ring',
            year: 2001,
        },
        {
            label: 'Star Wars: Episode V - The Empire Strikes Back',
            year: 1980,
        },
        { label: 'Forrest Gump', year: 1994 },
        { label: 'Inception', year: 2010 },
        {
            label: 'The Lord of the Rings: The Two Towers',
            year: 2002,
        },
        { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { label: 'Goodfellas', year: 1990 },
        { label: 'The Matrix', year: 1999 },
        { label: 'Seven Samurai', year: 1954 },
        {
            label: 'Star Wars: Episode IV - A New Hope',
            year: 1977,
        },
        { label: 'City of God', year: 2002 },
        { label: 'Se7en', year: 1995 },
        { label: 'The Silence of the Lambs', year: 1991 },
        { label: "It's a Wonderful Life", year: 1946 },
        { label: 'Life Is Beautiful', year: 1997 },
        { label: 'The Usual Suspects', year: 1995 },
        { label: 'Léon: The Professional', year: 1994 },
        { label: 'Spirited Away', year: 2001 },
        { label: 'Saving Private Ryan', year: 1998 },
        { label: 'Once Upon a Time in the West', year: 1968 },
        { label: 'American History X', year: 1998 },
        { label: 'Interstellar', year: 2014 },
        { label: 'Casablanca', year: 1942 },
        { label: 'City Lights', year: 1931 },
        { label: 'Psycho', year: 1960 },
        { label: 'The Green Mile', year: 1999 },
        { label: 'The Intouchables', year: 2011 },
        { label: 'Modern Times', year: 1936 },
        { label: 'Raiders of the Lost Ark', year: 1981 },
        { label: 'Rear Window', year: 1954 },
        { label: 'The Pianist', year: 2002 },
        { label: 'The Departed', year: 2006 },
        { label: 'Terminator 2: Judgment Day', year: 1991 },
        { label: 'Back to the Future', year: 1985 },
        { label: 'Whiplash', year: 2014 },
        { label: 'Gladiator', year: 2000 },
        { label: 'Memento', year: 2000 },
        { label: 'The Prestige', year: 2006 },
        { label: 'The Lion King', year: 1994 },
        { label: 'Apocalypse Now', year: 1979 },
        { label: 'Alien', year: 1979 },
        { label: 'Sunset Boulevard', year: 1950 },
        {
            label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
            year: 1964,
        },
        { label: 'The Great Dictator', year: 1940 },
        { label: 'Cinema Paradiso', year: 1988 },
        { label: 'The Lives of Others', year: 2006 },
        { label: 'Grave of the Fireflies', year: 1988 },
        { label: 'Paths of Glory', year: 1957 },
        { label: 'Django Unchained', year: 2012 },
        { label: 'The Shining', year: 1980 },
        { label: 'WALL·E', year: 2008 },
        { label: 'American Beauty', year: 1999 },
        { label: 'The Dark Knight Rises', year: 2012 },
        { label: 'Princess Mononoke', year: 1997 },
        { label: 'Aliens', year: 1986 },
        { label: 'Oldboy', year: 2003 },
        { label: 'Once Upon a Time in America', year: 1984 },
        { label: 'Witness for the Prosecution', year: 1957 },
        { label: 'Das Boot', year: 1981 },
        { label: 'Citizen Kane', year: 1941 },
        { label: 'North by Northwest', year: 1959 },
        { label: 'Vertigo', year: 1958 },
        {
            label: 'Star Wars: Episode VI - Return of the Jedi',
            year: 1983,
        },
        { label: 'Reservoir Dogs', year: 1992 },
        { label: 'Braveheart', year: 1995 },
        { label: 'M', year: 1931 },
        { label: 'Requiem for a Dream', year: 2000 },
        { label: 'Amélie', year: 2001 },
        { label: 'A Clockwork Orange', year: 1971 },
        { label: 'Like Stars on Earth', year: 2007 },
        { label: 'Taxi Driver', year: 1976 },
        { label: 'Lawrence of Arabia', year: 1962 },
        { label: 'Double Indemnity', year: 1944 },
        {
            label: 'Eternal Sunshine of the Spotless Mind',
            year: 2004,
        },
        { label: 'Amadeus', year: 1984 },
        { label: 'To Kill a Mockingbird', year: 1962 },
        { label: 'Toy Story 3', year: 2010 },
        { label: 'Logan', year: 2017 },
        { label: 'Full Metal Jacket', year: 1987 },
        { label: 'Dangal', year: 2016 },
        { label: 'The Sting', year: 1973 },
        { label: '2001: A Space Odyssey', year: 1968 },
        { label: "Singin' in the Rain", year: 1952 },
        { label: 'Toy Story', year: 1995 },
        { label: 'Bicycle Thieves', year: 1948 },
        { label: 'The Kid', year: 1921 },
        { label: 'Inglourious Basterds', year: 2009 },
        { label: 'Snatch', year: 2000 },
        { label: '3 Idiots', year: 2009 },
        { label: 'Monty Python and the Holy Grail', year: 1975 },
    ];

    interface Data {
        calories: number;
        carbs: number;
        fat: number;
        name: string;
        protein: number;
    }

    function createData(
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number,
    ): Data {
        return {
            name,
            calories,
            fat,
            carbs,
            protein,
        };
    }

    const rows = [
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Donut', 452, 25.0, 51, 4.9),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
        createData('Honeycomb', 408, 3.2, 87, 6.5),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Jelly Bean', 375, 0.0, 94, 0.0),
        createData('KitKat', 518, 26.0, 65, 7.0),
        createData('Lollipop', 392, 0.2, 98, 0.0),
        createData('Marshmallow', 318, 0, 81, 2.0),
        createData('Nougat', 360, 19.0, 9, 37.0),
        createData('Oreo', 437, 18.0, 63, 4.0),
    ];

    const StyledTyporaphy = styled(Typography)({
        position: 'relative',
        textAlign: 'left',
        color: '#146C94',
        fontSize: '12px',
        right: '10px',
        top: '6px',
        fontFamily: 'Inter, sans - serif',
    })

    const StyledTableRow = styled(TableRow)({
        borderBottom: "2px #AFD3E2 solid",
    });

    const StyledTableRowTitle = styled(TableRow)({
        borderBottom: "4px #AFD3E2 solid",
    });


    const StyledTableCell = styled(TableCell)({
        backgroundColor: "#AFD3E2",
        fontSize: '12px'
    });

    const StyledButton = styled(Button)({
        padding: 2.5,
        minHeight: 0,
        minWidth: 100,
        borderRadius: "22px",
        backgroundColor: '#AFD3E2',
        fontSize: '12px',
        color: '#146C94',
        textTransform: "none",
        fontWeight: "bold",
        width: 'fit-content',
        fontFamily: "Inter', sans-serif",
        display: 'inline-block',

        '&:hover': {
            backgroundColor: '#AB8686',
        },
    });

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Receipt ID', width: 160, headerAlign: 'center', align: 'center' },
        { field: 'paymentTransactionID', headerName: 'Payment Transaction ID', width: 240, headerAlign: 'center', align: 'center' },
        {
          field: 'dealerName',
          headerName: 'Dealer Name',
          width: 160,
          editable: false,
          headerAlign: 'center', 
          align: 'center',
        },
        {
          field: 'paymentType',
          headerName: 'Payment Type',
          width: 170,
          editable: false,
          headerAlign: 'center', 
          align: 'center',
        },
        {
          field: 'paymentStatus',
          headerName: 'PaymentStatus',
          width: 160,
          editable: false,
          headerAlign: 'center', 
          align: 'center',
        },
        {
            field: 'receiverName',
            headerName: 'Receiver Name',
            width: 160,
            editable: false,
            headerAlign: 'center', 
            align: 'center',
        },
        {
            field: " ",
            renderCell: () => {
                return (
                    <Button
                        variant = "contained"
                        sx = {{ color: "#AFD3E2"}}
                    >View</Button>
                )
            },
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: "  ",
            renderCell: () => {
                return (
                    <Button
                        variant = "contained"
                        sx = {{ color: "#AFD3E2"}}
                    >Confirm</Button>
                )
            },
            sortable: false,
            disableColumnMenu: true,
        },
    ];

    const rowss = [
        { id: 12121, paymentTransactionID: 21212, dealerName: 'John Doe', paymentType: 'Installment(4 gives)', paymentStatus: 'pending', receiverName: 'Jane Doe' },
        { id: 23232, paymentTransactionID: 32323, dealerName: 'James Doe', paymentType: 'Installment(4 gives)', paymentStatus: 'ongoing', receiverName: 'Janet Doe' },
    ];

    const StyledPaymentListCard = styled(Card)({
        borderRadius: "20px",
        padding: 1,
        width: 1255,
        height: 540,
        position: "absolute",
        marginLeft: "22px",
        marginTop: "30px"
    });

    const StyledOverallCard = styled(Card)({
        borderRadius: "20px",
        width: 1300,
        height: 600,
        position: "absolute",
        marginLeft: "130px",
        marginTop: "20px"
    });

    return (
        <div>

            <StyledOverallCard>
                <StyledPaymentListCard>
                    <DataGrid
                        rows={rowss}
                        columns={columns.map((column) => ({
                            ...column,
                            headerClassName,
                          }))}
                        sx={{align: "center", color: "#146C94"}}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                    />
                    <style>{`
                        .${headerClassName} {
                            background-color: #AFD3E2;
                            fontWeight: bold;
                        }
                    `}</style>
                </StyledPaymentListCard>
            </StyledOverallCard>
    </div>
    )
}