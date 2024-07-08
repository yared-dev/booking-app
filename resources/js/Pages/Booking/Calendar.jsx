import React, { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, addMonths, subMonths, setMonth, setYear } from 'date-fns';
import {Grid, MenuItem, Select, IconButton, Typography, Box, CssBaseline} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import {startOfWeek} from "date-fns/startOfWeek";
import {endOfWeek} from "date-fns/endOfWeek";
import {parseISO} from "date-fns/parseISO";
import {set} from "date-fns/set";

const Calendar = ({ dateTime, onDateTimeChange, user }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [days, setDays] = useState([]);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const [timeSlots, setTimeSlots] = useState(null);

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [bookingDateTime, setBookingDateTime] = useState(null);

    const resetSelection = () => {
        setSelectedDate(null);
        setSelectedTimeSlot(null);
        setBookingDateTime(null);
    }



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
        resetSelection();
        const newDate = setMonth(currentDate, e.target.value);
        setCurrentDate(newDate);
    };

    const handleYearChange = (e) => {
        resetSelection();
        const newDate = setYear(currentDate, e.target.value);
        setCurrentDate(newDate);
    };

    const handlePrevMonth = () => {
        resetSelection();
        setCurrentDate(subMonths(currentDate, 1));
    }
    const handleNextMonth = () => {
        resetSelection();
        setCurrentDate(addMonths(currentDate, 1));
    }

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



    const formatDayString = () => {
        if (!selectedDate) {
            return;
        }

        let date = parseISO(selectedDate.toISOString());

        // Extract hours, minutes, and seconds from the time string
        const [hours, minutes, seconds] = selectedTimeSlot ? selectedTimeSlot.split(':') : timeSlots['1_hour_intervals'][1].split(':');

        // Set the hours, minutes, and seconds to the parsed date
        const parsedDate = set(date, { hours, minutes, seconds });

        // Format the date components
        const formatDateTime = format(date, 'MMMM dd, yyyy') + ' - ' + format(parsedDate, 'h:mm a');
        setBookingDateTime(formatDateTime);
    }

    useEffect(() => {

            formatDayString()
            //onDateTimeChange({ selectedDate, selectedTimeSlot: selectedTimeSlot, bookingDateTime: bookingDateTime });

    }, [selectedTimeSlot]);

    useEffect(() => {
        onDateTimeChange({ selectedDate, selectedTimeSlot: selectedTimeSlot, bookingDateTime: bookingDateTime });
    }, [bookingDateTime]);

    const handleSelectTimeSlot = (index) => {
        console.log(index);
        setSelectedTimeSlot(index);
    }

    const handleFetchDaySlots = (day) => {
        console.log(day);
        setSelectedTimeSlot(null);
        setBookingDateTime(null);

        axios.post(route('booking.available-slots'), {
            day: day,
            employee: user.id
        })
            .then(response => {
                console.log(response)
                setSelectedDate(day);
                setSelectedTimeSlot(response.data.timeSlots['1_hour_intervals'][0]);
                setTimeSlots(response.data.timeSlots);
                formatDayString()
            })
            .catch(error => {
                console.log(error)
                //setError(error.response ? error.response.data.message : 'An error occurred');
            });

        /*router.post(route('booking.available-slots'), {
                day: day,
                employee: user.id
            },
            {
                onSuccess: (response) => {
                    console.log(response);
                    setSelectedDate(day);
                    setSelectedTimeSlot(response.props.timeSlots['1_hour_intervals'][0]);
                    formatDayString()
                },
                onError: (error) => {
                    console.log(error);
                }
            }
        );*/
    }

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
                    <Grid item xs={1} key={day} sx={{padding: 1, textAlign: 'center', fontWeight: 'bold' }}>
                        {day}
                    </Grid>
                ))}
            </Grid>
            {getWeeks().map((week, weekIndex) => (
                <Grid container spacing={1} justifyContent="space-evenly" key={weekIndex} py={1}>
                    {week.map((day, dayIndex) => (
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
                                backgroundColor: currentDate.getMonth() === day.getMonth() ? 'white' : '#f0f0f0',
                                '&:hover': {
                                    backgroundColor:
                                        currentDate.getMonth() === day.getMonth() ? '#e0e0e0' : '#f0f0f0', // Different hover colors
                                    borderColor: '#999',
                                },
                            }}
                        >
                            {format(day, 'd')}
                        </Grid>
                    ))}
                </Grid>
            ))}
            {selectedDate && (
                <>
                    <Typography variant="h6" gutterBottom>{bookingDateTime}</Typography>
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
                                      '&:hover': {
                                          backgroundColor: '#f0f0f0', // Change to the desired hover background color
                                          borderColor: '#999', // Change to the desired hover border color
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
