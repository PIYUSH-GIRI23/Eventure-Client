import * as XLSX from 'xlsx';

export const exportVolunteersToExcel = (volunteersData, eventName) => {
    try {
        if (!volunteersData || volunteersData.length === 0) {
            alert('No volunteer data to export');
            return;
        }

        // Prepare data for Excel
        const excelData = volunteersData.map(volunteer => ({
            'First Name': volunteer.firstName || '',
            'Last Name': volunteer.lastName || '',
            'Username': volunteer.username || '',
            'Email': volunteer.email || '',
            'Contact': volunteer.contact || '',
            'City': volunteer.city || '',
            'Country': volunteer.country || '',
            'Pincode': volunteer.pinCode || '',
            'Introduction': volunteer.introduction || '',
            'Skills': Array.isArray(volunteer.skills) ? volunteer.skills.join(', ') : '',
            'Education': Array.isArray(volunteer.education) ? volunteer.education.map(e => e.degree || e).join(', ') : '',
            'Events Participated': volunteer.total_events_participated || 0,
            'Joined Date': volunteer.dateOfJoining ? new Date(volunteer.dateOfJoining).toLocaleDateString() : '',
        }));

        // Create workbook and worksheet
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Volunteers');

        // Set column widths
        worksheet['!cols'] = [
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 25 },
            { wch: 15 },
            { wch: 15 },
            { wch: 12 },
            { wch: 12 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 18 },
            { wch: 15 },
        ];

        // Generate filename
        const filename = `${eventName.replace(/\s+/g, '_')}_Volunteers_${new Date().toISOString().split('T')[0]}.xlsx`;

        // Write file
        XLSX.writeFile(workbook, filename);
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        alert('Failed to export volunteer data. Please try again.');
    }
};

export const generateVolunteersExcelWithSummary = (volunteersData, eventData) => {
    try {
        if (!volunteersData || volunteersData.length === 0) {
            alert('No volunteer data to export');
            return;
        }

        const workbook = XLSX.utils.book_new();

        // Sheet 1: Volunteer Details
        const volunteersExcelData = volunteersData.map(volunteer => ({
            'First Name': volunteer.firstName || '',
            'Last Name': volunteer.lastName || '',
            'Username': volunteer.username || '',
            'Email': volunteer.email || '',
            'Contact': volunteer.contact || '',
            'City': volunteer.city || '',
            'Country': volunteer.country || '',
            'Pincode': volunteer.pinCode || '',
            'Introduction': volunteer.introduction || '',
            'Skills': Array.isArray(volunteer.skills) ? volunteer.skills.join('; ') : '',
            'Education': Array.isArray(volunteer.education) ? volunteer.education.map(e => e.degree || e).join('; ') : '',
            'Events Participated': volunteer.total_events_participated || 0,
            'Joined': volunteer.dateOfJoining ? new Date(volunteer.dateOfJoining).toLocaleDateString() : '',
        }));

        const volunteersSheet = XLSX.utils.json_to_sheet(volunteersExcelData);
        volunteersSheet['!cols'] = [
            { wch: 12 },
            { wch: 12 },
            { wch: 15 },
            { wch: 25 },
            { wch: 15 },
            { wch: 15 },
            { wch: 12 },
            { wch: 12 },
            { wch: 30 },
            { wch: 35 },
            { wch: 35 },
            { wch: 18 },
            { wch: 15 }
        ];
        XLSX.utils.book_append_sheet(workbook, volunteersSheet, 'Volunteers');

        // Generate filename
        const filename = `${eventData?.event_name?.replace(/\s+/g, '_') || 'Event'}_Volunteers_${new Date().toISOString().split('T')[0]}.xlsx`;

        // Write file
        XLSX.writeFile(workbook, filename);
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        alert('Failed to export volunteer data. Please try again.');
    }
};
