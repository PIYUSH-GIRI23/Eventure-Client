import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateEventPDF = async (event) => {
    try {
        // Create a hidden container for the PDF content
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.width = '800px';
        container.style.padding = '40px';
        container.style.backgroundColor = '#ffffff';
        container.style.fontFamily = 'Arial, sans-serif';

        // Build the HTML content
        const skillsHTML = event.skills && event.skills.length > 0
            ? `<div style="margin-top: 20px;">
                <h3 style="color: #1f2937; font-size: 14px; font-weight: bold; margin-bottom: 10px;">SKILLS REQUIRED</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${event.skills.map(skill => `
                        <span style="background-color: #e5e7eb; color: #374151; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 500;">
                            ${skill}
                        </span>
                    `).join('')}
                </div>
            </div>`
            : '';

        const experienceHTML = event.experience && event.experience.length > 0
            ? `<div style="margin-top: 20px;">
                <h3 style="color: #1f2937; font-size: 14px; font-weight: bold; margin-bottom: 10px;">REQUIRED EXPERIENCE</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${event.experience.map(exp => `
                        <span style="background-color: #e5e7eb; color: #374151; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 500;">
                            ${exp}
                        </span>
                    `).join('')}
                </div>
            </div>`
            : '';

        container.innerHTML = `
            <div style="max-width: 100%; margin: 0 auto;">
                <!-- Header with event name -->
                <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #6366f1; padding-bottom: 20px;">
                    <h1 style="color: #1f2937; font-size: 32px; font-weight: bold; margin: 0 0 10px 0;">
                        ${event.event_name}
                    </h1>
                    <p style="color: #6366f1; font-size: 18px; font-weight: 600; margin: 0;">
                        ${event.title}
                    </p>
                </div>

                <!-- Event Banner Image -->
                ${event.banner ? `
                    <div style="margin-bottom: 30px; text-align: center;">
                        <img src="${event.banner}" alt="Event Banner" style="max-width: 100%; height: 300px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    </div>
                ` : ''}

                <!-- Event Details Grid -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                    <!-- Date and Time -->
                    <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px;">
                        <h3 style="color: #6366f1; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 8px;">📅 Date & Time</h3>
                        <p style="color: #1f2937; font-size: 14px; margin: 5px 0; font-weight: 600;">${event.start_date}</p>
                        <p style="color: #6b7280; font-size: 13px; margin: 0;">Starting at ${event.start_time}</p>
                    </div>

                    <!-- Location -->
                    <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px;">
                        <h3 style="color: #6366f1; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 8px;">📍 Location</h3>
                        <p style="color: #1f2937; font-size: 14px; margin: 0;">${event.location}</p>
                    </div>
                </div>

                <!-- Description -->
                <div style="margin-bottom: 30px;">
                    <h2 style="color: #1f2937; font-size: 16px; font-weight: bold; margin-bottom: 12px;">ABOUT THIS EVENT</h2>
                    <p style="color: #374151; font-size: 13px; line-height: 1.6; margin: 0;">
                        ${event.description}
                    </p>
                </div>

                <!-- Skills and Experience -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                    <div>
                        ${skillsHTML}
                    </div>
                    <div>
                        ${experienceHTML}
                    </div>
                </div>

                <!-- Manager Info -->
                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-top: 30px; border-left: 4px solid #6366f1;">
                    <h3 style="color: #1f2937; font-size: 14px; font-weight: bold; margin-top: 0; margin-bottom: 8px;">EVENT ORGANIZER</h3>
                    <p style="color: #1f2937; font-size: 13px; font-weight: 600; margin: 5px 0;">${event.manager_name}</p>
                    <p style="color: #6b7280; font-size: 12px; margin: 3px 0;">@${event.manager_username}</p>
                    <p style="color: #6b7280; font-size: 12px; margin: 3px 0;">${event.manager_email}</p>
                    <p style="color: #6b7280; font-size: 12px; margin: 3px 0;">
                        <span style="font-weight: bold;">Company:</span> ${event.company_name || 'Not specified'}
                    </p>
                </div>

                <!-- Stats Footer -->
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
                    <div style="text-align: center;">
                        <p style="color: #6366f1; font-size: 20px; font-weight: bold; margin: 0;">❤️ ${event.likes_count || 0}</p>
                        <p style="color: #6b7280; font-size: 11px; margin-top: 4px;">Likes</p>
                    </div>
                    <div style="text-align: center;">
                        <p style="color: #6366f1; font-size: 20px; font-weight: bold; margin: 0;">🔖 ${event.bookmark_count || 0}</p>
                        <p style="color: #6b7280; font-size: 11px; margin-top: 4px;">Bookmarks</p>
                    </div>
                    <div style="text-align: center;">
                        <p style="color: #6366f1; font-size: 20px; font-weight: bold; margin: 0;">👥 ${event.volunteer_count || 0}</p>
                        <p style="color: #6b7280; font-size: 11px; margin-top: 4px;">Volunteers</p>
                    </div>
                </div>

                <!-- Footer -->
                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
                    <p style="color: #9ca3af; font-size: 11px; margin: 0;">Generated on ${new Date().toLocaleDateString()}</p>
                    <p style="color: #9ca3af; font-size: 11px; margin: 3px 0;">Eventure AI - Event Management Platform</p>
                </div>
            </div>
        `;

        document.body.appendChild(container);

        // Convert HTML to canvas
        const canvas = await html2canvas(container, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        });

        // Remove the temporary container
        document.body.removeChild(container);

        // Create PDF from canvas
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);

        // Download the PDF
        pdf.save(`${event.event_name.replace(/\s+/g, '_')}_poster.pdf`);
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Please try again.');
    }
};
