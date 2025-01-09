import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../assets/images/web3logo.png';
import { BrowserProvider, Contract } from 'ethers';
import { abi } from '../scdata/Cert.json';
import { CertModuleCert } from '../scdata/deployed_addresses.json';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ViewCertificate = () => {
  const provider = new BrowserProvider(window.ethereum);
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const certificateRef = useRef(null);

  useEffect(() => {
    async function getcert(searchId) {
      try {
        const signer = await provider.getSigner();
        const instance = new Contract(CertModuleCert, abi, signer);
        const result = await instance.Certificates(searchId);
        console.log(result);

        setCertificate({
          name: result[0],
          course: result[1],
          grade: result[2],
          date: result[3],
        });
      } catch (error) {
        console.error('Error fetching certificate:', error);
      }
    }

    if (id) {
      getcert(id);
    }
  }, [id]);

  const downloadCertificate = () => {
    if (certificateRef.current) {
      html2canvas(certificateRef.current, {
        backgroundColor: '#ffffff', // Ensure the background color is white
        scale: 2, // Increase the scale to improve quality
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape', 'mm', 'a4'); // Set landscape mode
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`certificate_${id}.pdf`);
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-8">
      <div
        ref={certificateRef}
        className="relative w-full max-w-[297mm] h-[210mm] bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col justify-center items-center p-8"
      >
        {/* Certificate Header */}
        <div className="text-center mb-8">
          <img src={logo} className="w-40 mx-auto mb-4" alt="KBA Logo" />
          <h3 className="text-6xl font-serif font-bold text-gray-800 mb-3">
            Wira Blockchain Academy
          </h3>
          <p className="text-2xl text-gray-700 italic">
            Certificate of Achievement
          </p>
        </div>

        {/* Certificate Content */}
        {certificate ? (
          <div className="text-center text-xl text-gray-800 leading-relaxed mx-auto max-w-[80%]">
            <p className="mb-8">
              This is to certify that
              <span className="font-bold text-gray-900"> {certificate.name} </span>
              has successfully completed the
              <span className="font-bold text-gray-900"> {certificate.course} </span>
              course with a grade of
              <span className="font-bold text-gray-900"> {certificate.grade} </span>
              on
              <span className="font-bold text-gray-900"> {certificate.date} </span>.
            </p>
          </div>
        ) : (
          <p className="text-xl text-center text-gray-500">
            Loading certificate details...
          </p>
        )}

        {/* Certificate ID */}
        <div className="absolute bottom-6 right-10 text-lg text-gray-800">
          <p>Certificate ID: <span className="font-bold text-gray-900">{id}</span></p>
        </div>

        {/* Decorative Borders */}
        <div className="absolute inset-0 border-[12px] border-double border-gray-400 rounded-[16px] pointer-events-none"></div>
        <div className="absolute inset-4 border-[6px] border-double border-gray-200 rounded-[12px] pointer-events-none"></div>
      </div>

      {/* Floating Download Button */}
      <button
        onClick={downloadCertificate}
        className="fixed bottom-4 right-4 px-6 py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 cursor-pointer transition duration-200 ease-in-out"
      >
        Download Certificate
      </button>
    </div>
  );
};

export default ViewCertificate;