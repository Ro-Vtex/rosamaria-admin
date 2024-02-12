import React, { useState } from 'react';
import { Dropzone, Button, Alert } from 'vtex.styleguide';
import { simulateFileUpload } from '../../services/products/uploadProducts';

const TableIcon = (
	<svg width="44" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M0 24h44v11a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V24z" fill="#E3E4E6" />
		<rect x="4" y="29" width="8" height="2" rx="1" fill="#727273" />
		<rect x="18" y="29" width="8" height="2" rx="1" fill="#727273" />
		<rect x="36" y="29" width="4" height="2" rx="1" fill="#727273" />
		<path d="M44 12H0V1a1 1 0 0 1 1-1h42a1 1 0 0 1 1 1v11z" fill="#F71963" />
		<rect
			x="40"
			y="7"
			width="4"
			height="2"
			rx="1"
			transform="rotate(180 40 7)"
			fill="#fff"
		/>
		<rect
			x="26"
			y="7"
			width="8"
			height="2"
			rx="1"
			transform="rotate(180 26 7)"
			fill="#fff"
		/>
		<rect
			x="12"
			y="7"
			width="8"
			height="2"
			rx="1"
			transform="rotate(180 12 7)"
			fill="#fff"
		/>
		<path d="M0 12h44v12H0V12z" fill="#CACBCC" />
		<rect x="4" y="17" width="8" height="2" rx="1" fill="#727273" />
		<rect x="18" y="17" width="8" height="2" rx="1" fill="#727273" />
		<rect x="36" y="17" width="4" height="2" rx="1" fill="#727273" />
	</svg>
)

const ProductDropzone = () => {
	const [file, setFile] = useState<File | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false); // Nuevo estado para el indicador de carga
	const [successMessage, setSuccessMessage] = useState<boolean>(false); // Nuevo estado para mostrar el mensaje de éxito

	const handleFile = (files: File[]) => {
		setFile(files[0]);
	};

	const handleReset = () => {
		setFile(null);
	};

	const handleUploadClick = async () => {
		if (!file) {
			return;
		}

		setIsLoading(true); // Cambia el estado a isLoading cuando se inicia la carga

		try {
			// Simula la carga del archivo
			await simulateFileUpload(file);

			// Muestra el mensaje de carga exitosa
			setSuccessMessage(true);
		} catch (error) {
			// Maneja el error de carga
			console.error('Error de carga:', error);
			alert('Error al cargar el archivo');
		} finally {
			setIsLoading(false); // Cambia el estado de isLoading cuando la carga finaliza (exitosa o fallida)
		}
	};

	return (
		<div>
			<div className='products-dropzone'>
				<Dropzone
					icon={TableIcon}
					onDropAccepted={handleFile}
					onFileReset={handleReset}
					accept=".xls,.xlsx"
					maxSize={10000000} // 10MB
					multiple={false}
				>
					<div className="pt7">
						<div>
							<span className="f4">Drop here your XLS or </span>
							<span className="f4 c-link">
								choose a file
							</span>
							<p className="f6 c-muted-2 tc">Maximum file size of 10 MB.</p>
						</div>
					</div>
				</Dropzone>
			</div>

			{/* Muestra el botón de carga solo si hay un archivo seleccionado*/}
			{file && (
				<div className='products-dropzone--btn'>
					<Button variation="primary" onClick={handleUploadClick} isLoading={isLoading}>Upload</Button>
				</div>
			)}

			{/* Muestra el mensaje de éxito si el estado de éxito es verdadero */}
			{successMessage && (
				<div className='alert'>
					<Alert type="success" autoClose={5000} onClose={() => setSuccessMessage(false)}>
						The file was successfully uploaded.
					</Alert>
				</div>
			)}
		</div>
	);
};

export default ProductDropzone;
