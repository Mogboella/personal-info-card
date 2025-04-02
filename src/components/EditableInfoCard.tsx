import { useState } from 'react';
import { Info } from "../utils/types";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
    TextField,
    Button,
    Grid,
    Typography,
    Box,
    Link,
    CardHeader,
    IconButton,
    Divider,
    InputAdornment,
    Fab
} from '@mui/material';
import { Save, Cancel, Edit, AddLink, Delete, Close } from '@mui/icons-material';
import { CopyButton } from './CopyButton';
import { formatAddressSingleLine } from '../utils';

export function EditableInfoCard({ info, onSave }: { info: Info, onSave: (updatedInfo: Info) => void }) {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState<Info>(info);
    const [newLink, setNewLink] = useState({ name: '', url: '' });

    const handleChange = (field: keyof Info, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNameChange = (field: keyof typeof formData.name, value: string) => {
        setFormData(prev => ({
            ...prev,
            name: { ...prev.name, [field]: value }
        }));
    };

    const handleAddressChange = (field: keyof typeof formData.address, value: string) => {
        setFormData(prev => ({
            ...prev,
            address: { ...prev.address, [field]: value }
        }));
    };

    const handleLinkChange = (index: number, field: 'name' | 'url', value: string) => {
        const updatedLinks = [...formData.links];
        updatedLinks[index] = { ...updatedLinks[index], [field]: value };
        setFormData(prev => ({ ...prev, links: updatedLinks }));
    };

    const addLink = () => {
        if (newLink.name && newLink.url) {
            setFormData(prev => ({
                ...prev,
                links: [...prev.links, newLink]
            }));
            setNewLink({ name: '', url: '' });
        }
    };

    const removeLink = (index: number) => {
        setFormData(prev => ({
            ...prev,
            links: prev.links.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = () => {
        onSave(formData);
        setEditMode(false);
    };

    return (
        <>
            <Card variant="outlined" sx={{ maxWidth: 500, mx: "auto", p: 3, mb: 4, position: 'relative' }}>
                <CardHeader
                    title="My Personal Info"
                    action={
                        editMode && (
                            <IconButton
                                aria-label="cancel"
                                onClick={() => setEditMode(false)}
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    mt: 0,
                                    mr: 0,
                                    color: 'text.secondary'
                                }}>
                                <Close />
                            </IconButton>
                        )}
                />
                <CardContent>
                    <Grid container spacing={2}>
                        {/* Name Section */}
                        <Grid size={{ xs: 12 }} >
                            <Typography variant="subtitle1" fontWeight="bold" mb={1} textAlign="left">Name</Typography>
                            {editMode ? (
                                <Box display="flex" gap={2}>
                                    <TextField
                                        label="First Name"
                                        value={formData.name.firstName}
                                        onChange={(e) => handleNameChange('firstName', e.target.value)}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Last Name"
                                        value={formData.name.lastName}
                                        onChange={(e) => handleNameChange('lastName', e.target.value)}
                                        fullWidth
                                    />
                                </Box>
                            ) : (
                                <Box display="flex" alignItems="center">
                                    <Typography>
                                        {formData.name.firstName} {formData.name.lastName}
                                    </Typography>
                                    <CopyButton textToCopy={`${formData.name.firstName} ${formData.name.lastName}`} />
                                </Box>
                            )}
                        </Grid>

                        <Box sx={{ my: 1, width: '100%' }} />

                        {/* Email and Phone */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="subtitle1" fontWeight="bold" mb={1} textAlign="left">Email</Typography>
                            {editMode ? (
                                <TextField
                                    fullWidth
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    type="email"
                                    margin="normal"
                                />
                            ) : (
                                <Box display="flex" alignItems="center">
                                    <Typography>{formData.email}</Typography>
                                    <CopyButton textToCopy={formData.email} />
                                </Box>
                            )}
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="subtitle1" fontWeight="bold" mb={1} textAlign="left">Phone</Typography>
                            {editMode ? (
                                <Box display="flex" gap={1} mt={3}>
                                    <TextField
                                        label="Country Code"
                                        value={formData.number.countryCode}
                                        onChange={(e) => handleChange('number', {
                                            ...formData.number,
                                            countryCode: e.target.value
                                        })}
                                        sx={{ width: 100 }}
                                    />
                                    <TextField
                                        label="Number"
                                        value={formData.number.number}
                                        onChange={(e) => handleChange('number', {
                                            ...formData.number,
                                            number: e.target.value
                                        })}
                                        fullWidth
                                    />
                                </Box>
                            ) : (
                                <Box display="flex" alignItems="center">
                                    <Typography>+{formData.number.countryCode} {formData.number.number}</Typography>
                                    <CopyButton textToCopy={`+${formData.number.countryCode} ${formData.number.number}`} />
                                </Box>
                            )}
                        </Grid>

                        <Box sx={{ my: 1, width: '100%' }} />

                        {/* Address */}
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle1" fontWeight="bold" mb={1} textAlign="left">Address</Typography>
                            {editMode ? (
                                <>
                                    <TextField
                                        label="Line 1"
                                        value={formData.address.line1}
                                        onChange={(e) => handleAddressChange('line1', e.target.value)}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Line 2"
                                        value={formData.address.line2}
                                        onChange={(e) => handleAddressChange('line2', e.target.value)}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Town/City"
                                        value={formData.address.town}
                                        onChange={(e) => handleAddressChange('town', e.target.value)}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <Box display="flex" gap={2}>
                                        <TextField
                                            label="County"
                                            value={formData.address.county}
                                            onChange={(e) => handleAddressChange('county', e.target.value)}
                                            fullWidth
                                        />
                                        <TextField
                                            label="Eircode"
                                            value={formData.address.eircode}
                                            onChange={(e) => handleAddressChange('eircode', e.target.value)}
                                            fullWidth
                                        />
                                    </Box>
                                </>
                            ) : (

                                <Box display="flex" alignItems="center">
                                    <Typography textAlign="left">
                                        {formatAddressSingleLine(formData.address)}
                                    </Typography>
                                    <CopyButton textToCopy={formatAddressSingleLine(formData.address)} />
                                </Box>
                            )}
                        </Grid>

                        <Box sx={{ my: 1, width: '100%' }} />

                        {/* Links */}
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle1" fontWeight="bold" mb={1} textAlign="left">Links</Typography>
                            {editMode ? (
                                <>
                                    {formData.links.map((link, index) => (
                                        <Box key={index} display="flex" gap={1} mb={2} alignItems="center">
                                            <TextField
                                                label="Name"
                                                value={link.name}
                                                onChange={(e) => handleLinkChange(index, 'name', e.target.value)}
                                                sx={{ flex: 1 }}
                                            />
                                            <TextField
                                                label="URL"
                                                value={link.url}
                                                onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                                                sx={{ flex: 2 }}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <CopyButton textToCopy={link.url} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <IconButton onClick={() => removeLink(index)} color="error">
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                    ))}
                                    <Box display="flex" gap={1} mt={2}>
                                        <TextField
                                            label="New Link Name"
                                            value={newLink.name}
                                            onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                                            sx={{ flex: 1 }}
                                        />
                                        <TextField
                                            label="New Link URL"
                                            value={newLink.url}
                                            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                                            sx={{ flex: 2 }}
                                        />
                                        <IconButton onClick={addLink} color="primary">
                                            <AddLink />
                                        </IconButton>
                                    </Box>
                                </>
                            ) : (
                                <Grid container spacing={2}>
                                    {formData.links.map((link, index) => (
                                        <Grid size={{ xs: 12, sm: 6 }} key={index}>
                                            <Box display="flex" alignItems="center">
                                                <Link href={link.url} target="_blank" rel="noopener noreferrer">
                                                    {link.name}
                                                </Link>
                                                <CopyButton textToCopy={link.url} />
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {!editMode && (
                <Fab
                    color="primary"
                    aria-label="edit"
                    sx={{
                        position: 'fixed',
                        bottom: 32,
                        right: 32,
                    }}
                    onClick={() => setEditMode(true)}
                >
                    <Edit />
                </Fab>
            )}

            {editMode && (
                <Fab
                    color="primary"
                    aria-label="save"
                    sx={{
                        position: 'fixed',
                        bottom: 32,
                        right: 32,
                    }}
                    onClick={handleSubmit}
                >
                    <Save />
                </Fab>
            )}
        </>
    );
}