import React, { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, addMonths, subMonths, setMonth, setYear } from 'date-fns';
import { Container, Grid, MenuItem, Select, IconButton, Typography, Button } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import {startOfWeek} from "date-fns/startOfWeek";
import {endOfWeek} from "date-fns/endOfWeek";

const Calendar = ({ onDayClick }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [days, setDays] = useState([]);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    useEffect(() => {
        const start = startOfMonth(currentDate);
        const end = endOfMonth(currentDate);
        const daysInterval = eachDayOfInterval({ start, end });

        const startWeek = startOfWeek(start);
        const endWeek = endOfWeek(end);

        const fullInterval = eachDayOfInterval({ start: startWeek, end: endWeek });

        setDays(fullInterval);
    }, [currentDate]);

    const handleMonthChange = (e) => {
        const newDate = setMonth(currentDate, e.target.value);
        setCurrentDate(newDate);
    };

    const handleYearChange = (e) => {
        const newDate = setYear(currentDate, e.target.value);
        setCurrentDate(newDate);
    };

    const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    const getWeeks = () => {
        const weeks = [];
        let week = [];

        days.forEach((day, index) => {
            week.push(day);
            if (week.length === 7) {
                weeks.push(week);
                week = [];
            }
        });

        if (week.length > 0) {
            weeks.push(week);
        }

        return weeks;
    };

    return (
        <Container>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <IconButton onClick={handlePrevMonth}>
                        <ArrowBackIos />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Select value={currentDate.getMonth()} onChange={handleMonthChange}>
                        {Array.from({ length: 12 }).map((_, i) => (
                            <MenuItem key={i} value={i}>
                                {format(new Date(currentDate.getFullYear(), i), 'MMMM')}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item>
                    <Select value={currentDate.getFullYear()} onChange={handleYearChange}>
                        {Array.from({ length: 10 }, (_, i) => (
                            <MenuItem key={i} value={currentDate.getFullYear() - 5 + i}>
                                {currentDate.getFullYear() - 5 + i}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item>
                    <IconButton onClick={handleNextMonth}>
                        <ArrowForwardIos />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container spacing={1} justifyContent="center" sx={{ marginTop: 2 }}>
                {daysOfWeek.map((day) => (
                    <Grid item xs={1} key={day} sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                        {day}
                    </Grid>
                ))}
            </Grid>
            {getWeeks().map((week, weekIndex) => (
                <Grid container spacing={1} justifyContent="center" key={weekIndex}>
                    {week.map((day, dayIndex) => (
                        <Grid
                            item
                            key={dayIndex}
                            xs={1}
                            onClick={() => onDayClick(day)}
                            sx={{
                                padding: 2,
                                border: '1px solid #ccc',
                                textAlign: 'center',
                                cursor: 'pointer',
                                backgroundColor: currentDate.getMonth() === day.getMonth() ? 'white' : '#f0f0f0',
                            }}
                        >
                            {format(day, 'd')}
                        </Grid>
                    ))}
                </Grid>
            ))}
        </Container>
    );
};

export default Calendar;
