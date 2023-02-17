import { MapContainer } from 'react-leaflet';
import GridLayer from './GridLayer';
import styles from '../../../styles/Leaflet.module.css';

interface LeafletProps {
    config: any;
    colorScheme: string[];
}

const Leaflet = ({ config, colorScheme }: LeafletProps) => {
    // Height of 733px is highest possible amount to avoid rendering blank pixels
    // TODO: increase height after blank pixel defect is fixed
    const smallScreen = window.innerHeight < 733 || window.innerWidth < 870;

    return (
        <MapContainer
            className={styles.leaflet}
            center={[-46, 10]}
            zoom={smallScreen ? 2 : 3}
            preferCanvas={true}
            attributionControl={false}
            zoomControl={false}
            doubleClickZoom={undefined}
            maxZoom={64}
            zoomAnimationThreshold={64}
        >
            <GridLayer config={config} colorScheme={colorScheme} />
        </MapContainer>
    );
};

export default Leaflet;
