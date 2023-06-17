import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import { PieChart, Pie, BarChart, Bar, LineChart, Line } from 'recharts';
import { useTable } from 'react-table';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const AdminDashboard = () => {
    const classes = useStyles();

    // Example data for the charts and table
    const pieChartData = [
        { name: 'Category 1', value: 20 },
        { name: 'Category 2', value: 35 },
        { name: 'Category 3', value: 45 },
    ];

    const barChartData = [
        { name: 'Data 1', value: 10 },
        { name: 'Data 2', value: 25 },
        { name: 'Data 3', value: 15 },
        { name: 'Data 4', value: 30 },
    ];

    const lineChartData = [
        { name: 'Day 1', value: 10 },
        { name: 'Day 2', value: 20 },
        { name: 'Day 3', value: 15 },
        { name: 'Day 4', value: 35 },
        { name: 'Day 5', value: 25 },
        { name: 'Day 6', value: 40 },
        { name: 'Day 7', value: 30 },
    ];

    const tableData = [
        { id: 1, name: 'Item 1', quantity: 5, price: 10 },
        { id: 2, name: 'Item 2', quantity: 10, price: 15 },
        { id: 3, name: 'Item 3', quantity: 3, price: 20 },
        { id: 4, name: 'Item 4', quantity: 8, price: 12 },
        { id: 5, name: 'Item 5', quantity: 2, price: 18 },
    ];

    // Define columns and data for the table
    const tableColumns = React.useMemo(
        () => [
            { Header: 'ID', accessor: 'id' },
            { Header: 'Name', accessor: 'name' },
            { Header: 'Quantity', accessor: 'quantity' },
            { Header: 'Price', accessor: 'price' },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns: tableColumns,
        data: tableData,
    });

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        {/* Add a header or title for the dashboard */}
                        <h2>Dashboard Template</h2>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper className={classes.paper}>
                        {/* Add a component for displaying a pie chart */}
                        <h3>Pie Chart</h3>
                        <PieChart width={400} height={300}>
                            <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" />
                        </PieChart>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper className={classes.paper}>
                        {/* Add a component for displaying a bar chart */}
                        <h3>Bar Chart</h3>
                        <BarChart width={400} height={300} data={barChartData}>
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper className={classes.paper}>
                        {/* Add a component for displaying a line chart */}
                        <h3>Line Chart</h3>
                        <LineChart width={400} height={300} data={lineChartData}>
                            <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        </LineChart>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        {/* Add a component for displaying a data table */}
                        <h3>Data Table</h3>
                        <table {...getTableProps()} className="table">
                            <thead>
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => (
                                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default AdminDashboard;
