export const simulateFileUpload = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
        console.log(reject, file)
        // Simula una carga con un tiempo de espera
        setTimeout(() => {
            // Simula el éxito de la carga
            resolve();
        }, 2000); // Simula una carga de 2 segundos
    });
};
