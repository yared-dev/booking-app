import React, { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, addMonths, subMonths, setMonth, setYear } from 'date-fns';
import {Grid, MenuItem, Select, IconButton, Typography, Box, CssBaseline} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import {startOfWeek} from "date-fns/startOfWeek";
import {endOfWeek} from "date-fns/endOfWeek";
import {parseISO} from "date-fns/parseISO";
import {set} from "date-fns/set";

const Calendar = ({ dateTime, onDateTimeChange, calendarState, onCalendarChange, user }) => {
    const { currentDate, days, timeSlots } = calendarState;
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const resetSelection = () => {
        onDateTimeChange({
            selectedDate: null,
            selectedTimeSlot: null,
            bookingDateTime: null
        });
    };

    useEffect(() => {
        const start = startOfMonth(currentDate);
        const end = endOfMonth(currentDate);
        const daysInterval = eachDayOfInterval({ start, end });

        const startWeek = startOfWeek(start);
        const endWeek = endOfWeek(end);

        const fullInterval = eachDayOfInterval({ start: startWeek, end: endWeek });

        onCalendarChange({ ...calendarState, days: fullInterval });
    }, [currentDate]);

    const handleMonthChange = (e) => {
        resetSelection();
        const newDate = setMonth(currentDate, e.target.value);
        onCalendarChange({ ...calendarState, currentDate: newDate });
    };

    const handleYearChange = (e) => {
        resetSelection();
        const newDate = setYear(currentDate, e.target.value);
        onCalendarChange({ ...calendarState, currentDate: newDate });
    };

    const handlePrevMonth = () => {
        resetSelection();
        const newDate = subMonths(currentDate, 1);
        onCalendarChange({ ...calendarState, currentDate: newDate });
    };

    const handleNextMonth = () => {
        resetSelection();
        const newDate = addMonths(currentDate, 1);
        onCalendarChange({ ...calendarState, currentDate: newDate });
    };

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

    const formatDayString = (selectedDate, selectedTimeSlot, timeSlots) => {
        if (!selectedDate) {
            return null;
        }

        let date = parseISO(selectedDate.toISOString());
        const [hours, minutes, seconds] = selectedTimeSlot ? selectedTimeSlot.split(':') : timeSlots['1_hour_intervals'][1].split(':');
        const parsedDate = set(date, { hours, minutes, seconds });
        return format(date, 'MMMM dd, yyyy') + ' - ' + format(parsedDate, 'h:mm a');
    };

    const handleSelectTimeSlot = (timeSlot) => {
        const bookingDateTime = formatDayString(dateTime.selectedDate, timeSlot, timeSlots);
        onDateTimeChange({
            ...dateTime,
            selectedTimeSlot: timeSlot,
            bookingDateTime: bookingDateTime
        });
    };

    const handleFetchDaySlots = (day) => {
        onDateTimeChange({
            ...dateTime,
            selectedDate: day,
            selectedTimeSlot: null,
            bookingDateTime: null
        });

        axios.post(route('booking.available-slots'), {
            day: day,
            employee: user.id
        })
            .then(response => {
                const initialTimeSlot = response.data.timeSlots['1_hour_intervals'][0];
                const bookingDateTime = formatDayString(day, initialTimeSlot, response.data.timeSlots);
                onCalendarChange({ ...calendarState, timeSlots: response.data.timeSlots });
                onDateTimeChange({
                    selectedDate: day,
                    selectedTimeSlot: initialTimeSlot,
                    bookingDateTime: bookingDateTime
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <Box width={'100%'}>
            <CssBaseline />
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={5}>
                    <Select fullWidth value={currentDate.getMonth()} onChange={handleMonthChange}>
                        {Array.from({ length: 12 }).map((_, i) => (
                            <MenuItem key={i} value={i}>
                                {format(new Date(currentDate.getFullYear(), i), 'MMMM')}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Select fullWidth value={currentDate.getFullYear()} onChange={handleYearChange}>
                        {Array.from({ length: 10 }, (_, i) => (
                            <MenuItem key={i} value={currentDate.getFullYear() - 5 + i}>
                                {currentDate.getFullYear() - 5 + i}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={6} sm={1}>
                    <IconButton onClick={handlePrevMonth}>
                        <ArrowBackIos />
                    </IconButton>
                </Grid>
                <Grid item xs={6} sm={1}>
                    <IconButton onClick={handleNextMonth}>
                        <ArrowForwardIos />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container spacing={1} justifyContent="space-evenly" py={2}>
                {daysOfWeek.map((day) => (
                    <Grid item xs={1} key={day} sx={{ padding: 1, textAlign: 'center', fontWeight: 'bold' }}>
                        {day}
                    </Grid>
                ))}
            </Grid>
            {getWeeks().map((week, weekIndex) => (
                <Grid container spacing={1} justifyContent="space-evenly" key={weekIndex} py={1}>
                    {week.map((day, dayIndex) => {
                        const isCurrentMonth = currentDate.getMonth() === day.getMonth();
                        const isSelectedDate = dateTime.selectedDate && day.getTime() === dateTime.selectedDate.getTime();
                        return (
                            <Grid
                                item
                                key={dayIndex}
                                xs={1}
                                onClick={() => handleFetchDaySlots(day)}
                                sx={{
                                    padding: 1,
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: isSelectedDate ? '#e0f7fa' : isCurrentMonth ? 'white' : '#f0f0f0',
                                    '&:hover': {
                                        backgroundColor: isCurrentMonth ? '#e0e0e0' : '#f0f0f0',
                                        borderColor: '#999',
                                    },
                                }}
                            >
                                {format(day, 'd')}
                            </Grid>
                        );
                    })}
                </Grid>
            ))}
            {dateTime.selectedDate && (
                <>
                    <Typography variant="h6" gutterBottom>{dateTime.bookingDateTime}</Typography>
                    <Grid container spacing={0} justifyContent="space-evenly" sx={{ marginTop: 2 }}>
                        {timeSlots && timeSlots['1_hour_intervals'].map((value, index) => (
                            <Grid key={index}
                                  sx={{
                                      padding: '2px 0',
                                      margin: 1,
                                      border: '1px solid #ccc',
                                      borderRadius: '4px',
                                      textAlign: 'center',
                                      cursor: 'pointer',
                                      backgroundColor: dateTime.selectedTimeSlot === value ? '#e0f7fa' : '',
                                      '&:hover': {
                                          backgroundColor: '#f0f0f0',
                                          borderColor: '#999',
                                      },
                                  }}
                                  item xs={12} sm={5} onClick={() => handleSelectTimeSlot(value)}>
                                {value}
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </Box>
    );
};

export default Calendar;
